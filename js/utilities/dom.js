export const createHtmlElement = (
  tag,
  classes = [],
  content,
  events = {},
  attributes = {}
) => {
  const element = document.createElement(tag);

  classes.forEach((cl) => element.classList.add(cl));
  element.textContent = content;

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  Object.entries(events).forEach(([eventName, handler]) => {
    element.addEventListener(eventName, handler);
  });

  return element;
};

export const customAppendChild = (parent, ...children) => {
  children.forEach((child) => parent.appendChild(child));
};

export const createBtn = (text, type, content, className, events) => {
  let btn = createHtmlElement('button', className, content);
  btn.type = type;
  btn.textContent = text;
  events.forEach(({ event, handler }) => {
    btn.addEventListener(event, handler);
  });
  return btn;
};

export const queryHtmlElement = (ele) => document.querySelector(ele);

export const createSwitcherButton = (label, isActive, onClick) => {
  return createHtmlElement(
    'button',
    [
      'type-option',
      'flex-1',
      'flex',
      'items-center',
      'justify-center',
      'gap-3',
      'font-bold',
      'text-lg',
      isActive ? 'active' : 'text-gray-600',
    ],
    label,
    { click: onClick }
  );
};

export const handleSwitcherClick = ({
  activeBtn,
  inactiveBtn,
  isAnime,
  switcherBgDiv,
  fetchData,
}) => {
  activeBtn.classList.add('active');
  activeBtn.classList.remove('text-gray-600');
  inactiveBtn.classList.remove('active');
  inactiveBtn.classList.add('text-gray-600');
  if (isAnime) {
    switcherBgDiv.classList.remove('rickandmorty');
  } else {
    switcherBgDiv.classList.add('rickandmorty');
  }
  fetchData();
};
