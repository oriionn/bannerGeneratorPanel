import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {FluentProvider, teamsDarkTheme, useThemeClassName} from '@fluentui/react-components';

function ApplyToBody() {
  const classes = useThemeClassName();

  useEffect(() => {
    const classList = classes.split(" ");
    document.body.classList.add(...classList);

    return () => document.body.classList.remove(...classList);
  }, [classes]);

  return null;
}

ReactDOM.render(<FluentProvider theme={teamsDarkTheme}>
  <ApplyToBody />
  <App />
</FluentProvider>, document.getElementById('root'));