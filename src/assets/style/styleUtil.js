import { css } from "styled-components";

export const sizes = {
  xl: "1439px",
  lg: "1199px",
  md: "991px",
  sm: "767px",
  xs: "575px",
  xxs: "373px",
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const shadow = (weight) => {
  const shadows = [
    css`
      box-shadow: 0 0.1rem 0.35rem rgba(0, 0, 0, 0.12),
        0 0.1rem 0.25rem rgba(0, 0, 0, 0.24);
    `,
    css`
      box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.16),
        0 0.3rem 0.6rem rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.19),
        0 0.6rem 0.6rem rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
        0 1rem 1rem rgba(0, 0, 0, 0.22);
    `,
    css`
      box-shadow: 0 1.9rem 3.8rem rgba(0, 0, 0, 0.3),
        0 1.5rem 1.2rem rgba(0, 0, 0, 0.22);
    `,
  ];

  return shadows[weight];
};

export const theme = (color) => {
  const colors = {
    green: "rgb(21, 177, 125)",
    darkgreen: "#2c4b48",
    beige: "#f4f0eb",
    darkbeige: "#e2d9cf",
    red: "rgb(255, 40, 50)",
    sky: "rgb(180, 220, 250)",
    lightgray: "#eee",
    gray: "#aaa",
    darkgray: "#555",
    white: "#fff",
    black: "#000",
    lightblack: "#333",
    grayGradient:
      "linear-gradient( to top, rgb(245,245,245), #aaa, rgb(245,245,245) );",
  };

  return colors[color];
};
