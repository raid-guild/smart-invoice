import chakraTheme from '@chakra-ui/theme';
import { css } from '@emotion/react';

import CalendarRed from './assets/calendar-red.svg';
import Calendar from './assets/calendar.svg';

export const theme = {
  ...chakraTheme,
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    ...chakraTheme.colors,
    red: {
      ...chakraTheme.colors.red,
      200: '#ffe2eb',
      300: '#ffb1c3',
      400: '#ff7f9c',
      500: '#ff3864',
      600: '#b30027',
      700: '#81001c',
      800: '#4f0010',
      900: '#200005',
    },
    green: '#38FF88',
    background: '#262626',
    white10: 'rgba(255,255,255,0.1)',
    white20: 'rgba(255,255,255,0.2)',
    black30: 'rgba(0,0,0,0.3)',
    black80: 'rgba(0,0,0,0.8)',
    grey: '#A4A4A4',
    borderGrey: '#505050',
    greyText: '#ABABAB',
    purple: '#702b89',
    red50: 'rgba(255, 56, 100, 0.5)',
  },
  fonts: {
    ...chakraTheme.fonts,
    mono: `'Rubik Mono One', sans-serif`,
    heading: `'Rubik One', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
};

export const globalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    box-shadow: none;
  }
  *:focus {
    outline: none;
    border-color: ${theme.colors.purple} !important;
    box-shadow: 0 0 0 1px ${theme.colors.purple} !important;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    opacity: 1;
    display: block;
    background: url(${Calendar}) no-repeat;
    background-size: contain !important;
    width: 14px;
    height: 14px;
    border-width: thin;
    cursor: pointer;
    transition: background 0.25s;
    &:hover {
      background: url(${CalendarRed}) no-repeat;
      background-size: contain;
    }
    &:hover,
    &:focus,
    &:active {
      background-size: contain;
      outline: none;
    }
  }
  select option {
    background: ${theme.colors.black} !important;
    color: ${theme.colors.white};
  }
  body {
    font-family: ${theme.fonts.body};
    background: ${theme.colors.black};
    color: ${theme.colors.white};
  }
  .web3modal-modal-lightbox {
    zindex: 20;
  }
`;
