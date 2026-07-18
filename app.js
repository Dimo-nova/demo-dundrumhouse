// Dundrum House — digital menu logic

const categories = ['Starters', 'Main Course', 'Sides', 'Kids', 'Desserts', 'Cocktails'];

const menu = {
  'Starters': [
    { name: 'Homemade Soup of the Day', desc: 'Served with homemade soda bread', price: '€4.50', tags: ['Veg'], allergens: '1,3,7,9' },
    { name: 'Chicken Caesar Salad', desc: 'Chicken & bacon, cos lettuce, parmesan, croutons, homemade Caesar dressing · main portion €12.50', price: '€7.95', tags: [], allergens: '1,3,7,8,9,12' },
    { name: 'Crispy Chicken Wings', desc: 'Tossed in hot & spicy or house BBQ sauce, blue cheese dip · large €13.50', price: '€8.50', tags: [], allergens: '1,3,4,6,7,9,10' }
  ],
  'Main Course': [
    { name: 'Homemade Lasagne', desc: 'Garlic cream sauce & sun-dried tomatoes, garlic bread & fries', price: '€13.95', tags: [], allergens: '1,3,7,9,10,12' },
    { name: 'Chicken & Mushroom Pasta', desc: 'White wine & garlic cream, spinach, egg yolk, parmesan, garlic bread · vegetarian option available', price: '€14.95', tags: [], allergens: '1,3,7,9,12' },
    { name: 'Southern Fried Burger', desc: 'Buttermilk chicken in southern-fried spice, toasted brioche, cheese & bacon, fries', price: '€14.95', tags: [], allergens: '1,3,7,9,11,12' },
    { name: 'Homemade Burger', desc: '8oz beef, cheese, lettuce, tomato, onion rings, brioche, fries & pepper sauce', price: '€14.95', tags: [], allergens: '1,3,4,7,8,10' },
    { name: '6oz Sirloin Steak Sandwich', desc: 'Cooked to your liking, sautéed mushrooms & onions, toasted ciabatta, fries & pepper sauce', price: '€15.95', tags: [], allergens: '1,3,7,9' },
    { name: 'Scampi', desc: 'Fresh tiger prawns in beer batter, lettuce, homemade garlic mayo, fries', price: '€15.95', tags: [], allergens: '1,2,10' }
  ],
  'Sides': [
    { name: 'Chips', desc: '', price: '€3.00', tags: ['Vegan', 'GF'], allergens: '' },
    { name: 'Garlic Bread', desc: '', price: '€3.00', tags: ['Veg'], allergens: '1,3,7' },
    { name: 'Beer Batter Onion Rings', desc: '', price: '€3.00', tags: ['Vegan'], allergens: '1' },
    { name: 'Sautéed Mushrooms & Onions', desc: '', price: '€3.00', tags: ['Vegan', 'GF'], allergens: '' }
  ],
  'Kids': [
    { name: 'Kids Chicken Tenders & Chips', desc: '', price: '€6.50', tags: [], allergens: '1,3' },
    { name: 'Kids Sausage & Chips', desc: '', price: '€6.50', tags: [], allergens: '1,12' }
  ],
  'Desserts': [
    { name: 'Warm Double Chocolate Fudge Cake', desc: 'Served warm with cream or ice cream', price: '€4.00', tags: ['Veg'], allergens: '1,3,7' },
    { name: 'Hot Apple Crumble', desc: 'With warm custard', price: '€4.00', tags: ['Veg'], allergens: '1,3,7' },
    { name: 'Homemade Frozen Meringue', desc: '', price: '€4.00', tags: ['Veg', 'GF'], allergens: '3,7' },
    { name: 'Cheesecake of the Day', desc: 'Ask your server', price: '€4.00', tags: ['Veg'], allergens: '1,3,7' }
  ],
  'Cocktails': [
    { name: 'House Rum Punch', desc: 'White rum, orange, pineapple, lime, strawberry syrup', price: '€10.50', tags: ['Vegan', 'GF'], allergens: '' },
    { name: "Captain's Mule", desc: 'Captain Morgan, lime, mint, ginger beer', price: '€10.50', tags: ['Vegan', 'GF'], allergens: '' },
    { name: 'Espresso Martini', desc: 'Vodka, Tia Maria, sugar syrup, shot of espresso', price: '€10.50', tags: ['Vegan', 'GF'], allergens: '' },
    { name: 'Glad to be "Bac"ardi', desc: 'Bacardi, gin, lime, grenadine, sugar, sparkling water', price: '€11.00', tags: ['Vegan', 'GF'], allergens: '' },
    { name: 'Ginger Whiskey Sour', desc: 'Whiskey, lemon, ginger syrup, egg white, apple juice', price: '€11.00', tags: ['Veg', 'GF'], allergens: '3' },
    { name: 'Strawberry & Basil Margarita', desc: 'Strawberries muddled with basil, tequila, Cointreau, lime, sugar', price: '€11.00', tags: ['Vegan', 'GF'], allergens: '' }
  ]
};

const fixtures = [
  { comp: 'Guinness Six Nations', match: 'Ireland v France', when: 'Sat · 16:45', screen: 'Main screen' },
  { comp: 'Premier League', match: 'Liverpool v Arsenal', when: 'Sun · 16:30', screen: 'Snug' },
  { comp: 'GAA Allianz League', match: 'Dublin v Kerry', when: 'Sat · 19:00', screen: 'Lounge' }
];

const music = [
  { day: 'Thursday', act: 'The Auld Trad Session', time: '9:00 pm' },
  { day: 'Friday', act: 'Rúraíocht — Live Band', time: '9:30 pm' },
  { day: 'Saturday', act: 'DJ Sets till Late', time: '10:00 pm' }
];

const dietOptions = ['All', 'Veg', 'Vegan', 'GF'];

const tabList = ['All', ...categories];

const state = { screen: 'home', tab: 'All', diet: 'All', query: '' };

const $ = (id) => document.getElementById(id);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ---- navigation ---- */

const screens = { home: $('screen-home'), menu: $('screen-menu'), whatson: $('screen-whatson'), visit: $('screen-visit') };

function navigate(screen) {
  state.screen = screen;
  if (location.hash.slice(1) !== screen) history.replaceState(null, '', screen === 'home' ? location.pathname : '#' + screen);
  for (const [name, node] of Object.entries(screens)) {
    node.hidden = name !== screen;
    if (name === screen) node.scrollTop = 0;
  }
  const bar = $('bottom-bar');
  bar.hidden = screen === 'home';
  $('nav-menu').classList.toggle('active', screen === 'menu');
  $('nav-whatson').classList.toggle('active', screen === 'whatson');
  $('nav-visit').classList.toggle('active', screen === 'visit');
}

document.querySelectorAll('[data-nav]').forEach((btn) => {
  btn.addEventListener('click', () => navigate(btn.dataset.nav));
});

/* ---- menu screen ---- */

function renderDietRow() {
  const row = $('diet-row');
  row.replaceChildren();
  for (const d of dietOptions) {
    const chip = el('button', 'diet-chip' + (d === state.diet ? ' active' : ''), d);
    chip.addEventListener('click', () => { state.diet = d; renderMenu(); });
    row.appendChild(chip);
  }
}

function renderTabs() {
  const row = $('tab-row');
  row.replaceChildren();
  for (const name of tabList) {
    const tab = el('button', 'tab-btn' + (name === state.tab ? ' active' : ''), name);
    tab.addEventListener('click', () => { state.tab = name; renderMenu(); });
    row.appendChild(tab);
  }
}

function filteredDishes() {
  const q = state.query.trim().toLowerCase();
  let list = state.tab === 'All'
    ? categories.flatMap((c) => menu[c].map((d) => ({ ...d, category: c })))
    : (menu[state.tab] || []).slice();
  if (state.diet === 'Veg') list = list.filter((d) => d.tags.includes('Veg') || d.tags.includes('Vegan'));
  else if (state.diet !== 'All') list = list.filter((d) => d.tags.includes(state.diet));
  if (q) list = list.filter((d) => (d.name + ' ' + d.desc).toLowerCase().includes(q));
  return list;
}

function renderDishes() {
  const container = $('dish-list');
  container.replaceChildren();
  document.querySelector('.menu-body').scrollTop = 0;
  const list = filteredDishes();
  $('empty-state').hidden = list.length > 0;
  $('section-title').textContent = state.tab === 'All' ? 'Full Menu' : state.tab;

  let lastCategory = null;
  for (const dish of list) {
    if (dish.category && dish.category !== lastCategory) {
      lastCategory = dish.category;
      container.appendChild(el('div', 'dish-group-label', dish.category));
    }
    const card = el('div', 'dish');
    const row = el('div', 'dish-row');
    row.appendChild(el('span', 'dish-name', dish.name));
    row.appendChild(el('span', 'dish-leader'));
    row.appendChild(el('span', 'dish-price', dish.price));
    card.appendChild(row);

    if (dish.desc) card.appendChild(el('div', 'dish-desc', dish.desc));

    if (dish.tags.length || dish.allergens) {
      const meta = el('div', 'dish-meta');
      for (const tag of dish.tags) meta.appendChild(el('span', 'dish-tag', tag));
      if (dish.allergens) meta.appendChild(el('span', 'dish-allergens', 'Allergens: ' + dish.allergens));
      card.appendChild(meta);
    }
    container.appendChild(card);
  }
}

function renderMenu() {
  renderDietRow();
  renderTabs();
  renderDishes();
}

const searchInput = $('search-input');
searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  $('search-clear').hidden = !state.query;
  renderDishes();
});

$('search-clear').addEventListener('click', () => {
  state.query = '';
  searchInput.value = '';
  $('search-clear').hidden = true;
  renderDishes();
  searchInput.focus();
});

/* ---- what's on ---- */

function renderWhatsOn() {
  const fxList = $('fixtures-list');
  fxList.replaceChildren();
  for (const fx of fixtures) {
    const card = el('div', 'fixture-card');
    card.appendChild(el('div', 'fixture-comp', fx.comp));
    card.appendChild(el('div', 'fixture-match', fx.match));
    const foot = el('div', 'fixture-foot');
    foot.appendChild(el('span', '', fx.when));
    foot.appendChild(el('span', '', fx.screen));
    card.appendChild(foot);
    fxList.appendChild(card);
  }

  const mList = $('music-list');
  mList.replaceChildren();
  for (const m of music) {
    const card = el('div', 'music-card');
    card.appendChild(el('div', 'music-day', m.day));
    card.appendChild(el('div', 'music-act', m.act));
    card.appendChild(el('div', 'music-time', m.time));
    mList.appendChild(card);
  }
}

/* ---- init ---- */

renderMenu();
renderWhatsOn();

const initial = location.hash.slice(1);
navigate(screens[initial] ? initial : 'home');

window.addEventListener('hashchange', () => {
  const target = location.hash.slice(1) || 'home';
  if (screens[target] && target !== state.screen) navigate(target);
});
