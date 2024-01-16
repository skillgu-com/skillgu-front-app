declare module '*.module.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-range-slider-input';