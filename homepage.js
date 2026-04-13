// ── Tagline Quotes ──
const quotes = [
    "\"Wish we could go to the moon together\"",
    "\"The city always wins... but not today.\"",
    "\"You wanna be a legend? Legends die, choom.\"",
    "\"Stay alive long enough to become someone worth remembering.\"",
    "\"Night City will eat you alive if you let it.\"",
    "\"Dreams cost nothing. Living them costs everything.\"",
    "\"You don't survive Night City — you endure it.\"",
    "\"Be someone. Even if it kills you.\"",
    "\"Crazy... but this is the only way to live.\"",
    "\"I didn't come this far to lose.\"",
    "\"When there's nothing left to lose, you've got everything to gain.\"",
    "\"Living by the sword means dying by it too.\"",
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('tagline').textContent = randomQuote;

// ── Nav Dropdowns ──
$('.nav-btn').on('click', function () {
    const drop = $(this).siblings('.nav-dropdown');
    const isOpen = drop.is(':visible');
    $('.nav-dropdown').slideUp(200);
    $('.nav-btn').removeClass('active');
    if (!isOpen) {
        drop.slideDown(200);
        $(this).addClass('active');
    }
});

$(document).on('click', function (e) {
    if (!$(e.target).closest('.nav-group').length) {
        $('.nav-dropdown').slideUp(200);
        $('.nav-btn').removeClass('active');
    }
});

// ── Music slide-up ──
$('#musicToggleBtn').on('click', function () {
    const isVisible = $('#musicPanel').is(':visible');
    $('#musicPanel').slideToggle(320, 'swing');
    if (isVisible) {
        $('.btn-label').text('Music');
        $(this).find('.music-icon').text('♪');
    } else {
        $('.btn-label').text('Close');
        $(this).find('.music-icon').text('✕');
    }
});

// ── Theme Switch ──
function applyTheme(theme) {
    if (theme === 'neon') {
        $('body').removeClass('dark').addClass('neon');
        $('#darkLabel').removeClass('active');
        $('#neonLabel').addClass('active');
        $('#themeToggle').prop('checked', true);
    } else {
        $('body').removeClass('neon').addClass('dark');
        $('#neonLabel').removeClass('active');
        $('#darkLabel').addClass('active');
        $('#themeToggle').prop('checked', false);
    }
}

// Load saved theme on page load
applyTheme(localStorage.getItem('theme') || 'dark');

$('#themeToggle').on('change', function () {
    const theme = $(this).is(':checked') ? 'neon' : 'dark';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});

// ── Recent Sites ──
function getRecent() {
    return JSON.parse(localStorage.getItem('recentSites') || '[]');
}

function saveRecent(name, url) {
    let recent = getRecent().filter(s => s.url !== url);
    recent.unshift({ name, url });
    recent = recent.slice(0, 5);
    localStorage.setItem('recentSites', JSON.stringify(recent));
}

function renderRecent() {
    const recent = getRecent();
    const list = $('#recent-list');
    list.empty();
    if (recent.length === 0) {
        list.append('<li class="recent-empty">No sites visited yet</li>');
    } else {
        recent.forEach((site, i) => {
            list.append(`<li><span class="recent-num">${i + 1}</span><a href="${site.url}" class="recent-link">${site.name}</a></li>`);
        });
    }
}

$(document).on('click', '.nav-dropdown a', function () {
    saveRecent($(this).text().trim(), $(this).attr('href'));
    renderRecent();
});

renderRecent();

// ── Clock & Greeting ──
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12)  return 'Good Morning, Ben ☀️';
    if (hour >= 12 && hour < 17) return 'Good Afternoon, Ben 🌤️';
    if (hour >= 17 && hour < 21) return 'Good Evening, Ben 🌆';
    return 'Good Night, Ben 🌙';
}

function updateClock() {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
    document.getElementById('date').textContent = new Date().toDateString();

}
setInterval(updateClock, 1000);
updateClock();

// ── Greeting Popup ──
const popup = document.getElementById('greeting-popup');
popup.textContent = getGreeting();
setTimeout(() => popup.classList.add('show'), 100);
setTimeout(() => popup.classList.remove('show'), 4000);

// ── To-Do List ──
function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todos = getTodos();
    const list = $('#todo-list');
    list.empty();
    todos.forEach((todo, i) => {
        list.append(`
            <li class="todo-item ${todo.done ? 'done' : ''}" data-index="${i}">
                <div class="todo-check">${todo.done ? '✓' : ''}</div>
                <span class="todo-text">${todo.text}</span>
                <button class="todo-delete" data-index="${i}">✕</button>
            </li>
        `);
    });
}

function addTodo() {
    const text = $('#todo-input').val().trim();
    if (!text) return;
    const todos = getTodos();
    todos.push({ text, done: false });
    saveTodos(todos);
    renderTodos();
    $('#todo-input').val('');
}

$(document).on('click', '.todo-check', function () {
    const i = $(this).closest('.todo-item').data('index');
    const todos = getTodos();
    todos[i].done = !todos[i].done;
    saveTodos(todos);
    renderTodos();
});

$(document).on('click', '.todo-delete', function (e) {
    e.stopPropagation();
    const i = $(this).data('index');
    const todos = getTodos();
    todos.splice(i, 1);
    saveTodos(todos);
    renderTodos();
});

$('#todo-add-btn').on('click', addTodo);

$('#todo-input').on('keydown', function (e) {
    if (e.key === 'Enter') addTodo();
});

$('#todoToggleBtn').on('click', function () {
    $('#todo-panel').slideToggle(320, 'swing');
});

renderTodos();

// ── Notes ──
const notesInput = document.getElementById('notes-input');
const notesFooter = document.getElementById('notes-footer');
let notesSaveTimer;

// Load saved notes
notesInput.value = localStorage.getItem('notes') || '';

notesInput.addEventListener('input', function () {
    clearTimeout(notesSaveTimer);
    notesFooter.textContent = 'Saving...';
    notesSaveTimer = setTimeout(() => {
        localStorage.setItem('notes', notesInput.value);
        notesFooter.textContent = 'Saved ✓';
    }, 600);
});

$('#notesToggleBtn').on('click', function () {
    $('#notes-panel').slideToggle(320, 'swing');
});

// ── Recent Sites Toggle ──
$('#recentToggleBtn').on('click', function () {
    $('#recent-sites').slideToggle(320, 'swing');
});

// ── Favicons in Dropdowns ──
function injectFavicons() {
    $('.nav-dropdown a').each(function () {
        const url = $(this).attr('href');
        const domain = new URL(url).origin;
        const favicon = `https://www.google.com/s2/favicons?sz=16&domain_url=${domain}`;
        $(this).prepend(`<img src="${favicon}" class="nav-favicon" alt="">`);
    });
}

injectFavicons();

// ── Calendar ──
let calDate = new Date();

function getEvents() {
    return JSON.parse(localStorage.getItem('calEvents') || '[]');
}
function saveEvents(events) {
    localStorage.setItem('calEvents', JSON.stringify(events));
}

function renderCalendar() {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const today = new Date();
    const events = getEvents();

    const monthNames = ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'];
    $('#cal-month-year').text(`${monthNames[month]} ${year}`);

    $('#cal-grid .cal-day').remove();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Prev month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        $('#cal-grid').append(`<div class="cal-day other-month">${daysInPrevMonth - i}</div>`);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const hasEvent = events.some(e => e.date === dateStr);
        $('#cal-grid').append(`<div class="cal-day${isToday ? ' today' : ''}${hasEvent ? ' has-event' : ''}">${d}</div>`);
    }

    // Next month leading days
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remaining; d++) {
        $('#cal-grid').append(`<div class="cal-day other-month">${d}</div>`);
    }

    renderEvents();
}

function renderEvents() {
    const events = getEvents().sort((a, b) => a.date.localeCompare(b.date));
    const list = $('#cal-events-list');
    list.empty();
    if (events.length === 0) {
        list.append('<li style="color:rgba(254,232,1,0.35);font-family:Cyberway Riders;font-size:13px;padding:4px 0;">No upcoming events</li>');
        return;
    }
    events.forEach((ev, i) => {
        const d = new Date(ev.date + 'T00:00:00');
        const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        list.append(`
            <li class="cal-event-item">
                <span class="cal-event-date-badge">${label}</span>
                <span class="cal-event-name">${ev.name}</span>
                <button class="cal-event-delete" data-index="${i}">✕</button>
            </li>
        `);
    });
}

function addEvent() {
    const date = $('#cal-event-date').val();
    const name = $('#cal-event-text').val().trim();
    if (!date || !name) return;
    const events = getEvents();
    events.push({ date, name });
    saveEvents(events);
    $('#cal-event-date').val('');
    $('#cal-event-text').val('');
    renderCalendar();
}

$(document).on('click', '.cal-event-delete', function () {
    const i = $(this).data('index');
    const events = getEvents();
    events.splice(i, 1);
    saveEvents(events);
    renderCalendar();
});

$('#cal-event-add').on('click', addEvent);
$('#cal-event-text').on('keydown', function (e) {
    if (e.key === 'Enter') addEvent();
});

$('#cal-prev').on('click', function () {
    calDate.setMonth(calDate.getMonth() - 1);
    renderCalendar();
});

$('#cal-next').on('click', function () {
    calDate.setMonth(calDate.getMonth() + 1);
    renderCalendar();
});

$('#calToggleBtn').on('click', function () {
    $('#cal-panel').slideToggle(320, 'swing');
});

renderCalendar();

// ── Settings ──
const CATEGORIES = ['📚 Class', '🎮 Gaming', '👤 Personal', '💼 Work'];
const NAV_DROP_IDS = ['navDrop1', 'navDrop2', 'navDrop3', 'navDrop4'];

function getCustomLinks() {
    return JSON.parse(localStorage.getItem('customLinks') || '[]');
}
function saveCustomLinks(links) {
    localStorage.setItem('customLinks', JSON.stringify(links));
}

function applyCustomLinks() {
    // Remove previously injected custom links
    $('.nav-dropdown .custom-link').remove();
    const links = getCustomLinks();
    links.forEach(link => {
        const dropId = NAV_DROP_IDS[link.cat];
        const domain = (() => { try { return new URL(link.url).origin; } catch(e) { return ''; } })();
        const favicon = domain ? `https://www.google.com/s2/favicons?sz=16&domain_url=${domain}` : '';
        const img = favicon ? `<img src="${favicon}" class="nav-favicon" alt="">` : '';
        $(`#${dropId}`).append(`<a href="${link.url}" class="custom-link" target="_blank">${img}${link.name}</a>`);
    });
}

function renderSettingsLinks() {
    const links = getCustomLinks();
    const container = $('#settings-link-list');
    container.empty();

    if (links.length === 0) {
        container.append('<div style="color:rgba(254,232,1,0.35);font-family:Cyberway Riders;font-size:13px;padding:4px;">No custom links added yet.</div>');
        return;
    }

    // Group by category
    CATEGORIES.forEach((catName, catIndex) => {
        const catLinks = links.filter(l => l.cat === catIndex);
        if (catLinks.length === 0) return;

        const group = $(`<div class="settings-category-group"></div>`);
        group.append(`<div class="settings-category-label">${catName}</div>`);

        catLinks.forEach(link => {
            const globalIndex = links.indexOf(link);
            const domain = (() => { try { return new URL(link.url).origin; } catch(e) { return ''; } })();
            const favicon = domain ? `https://www.google.com/s2/favicons?sz=16&domain_url=${domain}` : '';
            const img = favicon ? `<img src="${favicon}" alt="">` : '';
            group.append(`
                <div class="settings-link-item">
                    ${img}
                    <span class="settings-link-item-name">${link.name}</span>
                    <span class="settings-link-item-url">${link.url}</span>
                    <button class="settings-link-delete" data-index="${globalIndex}">✕</button>
                </div>
            `);
        });
        container.append(group);
    });
}

function openSettings() {
    renderSettingsLinks();
    $('#settings-overlay').fadeIn(200);
    $('#settings-modal').css('display', 'flex').addClass('open');
}

function closeSettings() {
    $('#settings-modal').removeClass('open');
    $('#settings-overlay').fadeOut(200);
    setTimeout(() => $('#settings-modal').css('display', 'none'), 200);
}

$('#settingsBtn').on('click', function() {
    const btn = $(this);
    btn.addClass('spinning');
    setTimeout(() => btn.removeClass('spinning'), 1000);
    openSettings();
});
$('#settings-close').on('click', closeSettings);
$('#settings-overlay').on('click', closeSettings);

$('#settings-add-btn').on('click', function () {
    const cat = parseInt($('#settings-category').val());
    const name = $('#settings-link-name').val().trim();
    const url = $('#settings-link-url').val().trim();
    if (!name || !url) return;

    const fullUrl = url.startsWith('http') ? url : 'https://' + url;
    const links = getCustomLinks();
    links.push({ cat, name, url: fullUrl });
    saveCustomLinks(links);
    applyCustomLinks();
    renderSettingsLinks();

    $('#settings-link-name').val('');
    $('#settings-link-url').val('');
});

$('#settings-link-name, #settings-link-url').on('keydown', function(e) {
    if (e.key === 'Enter') $('#settings-add-btn').trigger('click');
});

$(document).on('click', '.settings-link-delete', function () {
    const i = $(this).data('index');
    const links = getCustomLinks();
    links.splice(i, 1);
    saveCustomLinks(links);
    applyCustomLinks();
    renderSettingsLinks();
});

// Apply on load
applyCustomLinks();

// ── Button Visibility ──
const HIDDEN_BUTTONS_KEY = 'hiddenButtons';

function getHiddenButtons() {
    return JSON.parse(localStorage.getItem(HIDDEN_BUTTONS_KEY) || '[]');
}

function applyButtonVisibility() {
    const hidden = getHiddenButtons();
    $('.btn-visibility').each(function () {
        const target = $(this).data('target');
        if (hidden.includes(target)) {
            $('#' + target).hide();
            $(this).prop('checked', false);
        } else {
            $('#' + target).show();
            $(this).prop('checked', true);
        }
    });
}

$(document).on('change', '.btn-visibility', function () {
    const target = $(this).data('target');
    let hidden = getHiddenButtons();
    if ($(this).is(':checked')) {
        hidden = hidden.filter(id => id !== target);
        $('#' + target).show();
    } else {
        if (!hidden.includes(target)) hidden.push(target);
        $('#' + target).hide();
    }
    localStorage.setItem(HIDDEN_BUTTONS_KEY, JSON.stringify(hidden));
});

applyButtonVisibility();

// ── Calculator ──
(function () {
    let current = '0';
    let expression = '';
    let operator = null;
    let prevValue = null;
    let shouldReset = false;

    function updateDisplay() {
        $('#calc-display').text(current.length > 10 ? parseFloat(current).toPrecision(8) : current);
        $('#calc-expression').text(expression);
    }

    $(document).on('click', '.calc-btn', function () {
        const action = $(this).data('action');
        const val = $(this).data('val');

        if (action === 'num') {
            if (shouldReset) { current = val; shouldReset = false; }
            else current = current === '0' ? val : current + val;

        } else if (action === 'decimal') {
            if (shouldReset) { current = '0.'; shouldReset = false; }
            else if (!current.includes('.')) current += '.';

        } else if (action === 'op') {
            if (operator && !shouldReset) {
                current = String(calculate(parseFloat(prevValue), parseFloat(current), operator));
            }
            prevValue = current;
            operator = val;
            expression = `${current} ${val === '*' ? '×' : val === '/' ? '÷' : val}`;
            shouldReset = true;

        } else if (action === 'equals') {
            if (operator && prevValue !== null) {
                expression = `${prevValue} ${operator === '*' ? '×' : operator === '/' ? '÷' : operator} ${current} =`;
                current = String(calculate(parseFloat(prevValue), parseFloat(current), operator));
                operator = null;
                prevValue = null;
                shouldReset = true;
            }

        } else if (action === 'clear') {
            current = '0'; expression = ''; operator = null; prevValue = null; shouldReset = false;

        } else if (action === 'sign') {
            current = String(parseFloat(current) * -1);

        } else if (action === 'percent') {
            current = String(parseFloat(current) / 100);
        }

        updateDisplay();
    });

    function calculate(a, b, op) {
        switch(op) {
            case '+': return parseFloat((a + b).toPrecision(12));
            case '-': return parseFloat((a - b).toPrecision(12));
            case '*': return parseFloat((a * b).toPrecision(12));
            case '/': return b !== 0 ? parseFloat((a / b).toPrecision(12)) : 'Error';
        }
    }

    // Keyboard support
    $(document).on('keydown', function (e) {
        if (!$('#calc-panel').is(':visible')) return;
        const key = e.key;
        if ('0123456789'.includes(key)) $(`.calc-btn[data-val="${key}"]`).trigger('click');
        else if (key === '.') $('.calc-btn[data-action="decimal"]').trigger('click');
        else if (['+','-','*','/'].includes(key)) $(`.calc-btn[data-val="${key}"]`).trigger('click');
        else if (key === 'Enter' || key === '=') $('.calc-btn[data-action="equals"]').trigger('click');
        else if (key === 'Escape') $('.calc-btn[data-action="clear"]').trigger('click');
        else if (key === 'Backspace') {
            if (current.length > 1) current = current.slice(0, -1);
            else current = '0';
            updateDisplay();
        }
    });

    $('#calcToggleBtn').on('click', function () {
        $('#calc-panel').slideToggle(320, 'swing');
    });
})();