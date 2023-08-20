import React, { createElement } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello, world2!</h1>, document.getElementById('root'));
ReactDOM.render(<h1>second3</h1>, document.getElementById('root2'));
function Greeting({ name }: { name: string }) {
  return createElement('h1', { className: 'greeting' }, 'Hello', createElement('i', null, name), '. Welcome!');
}

// React 要素を生成する
const element = React.createElement(
  'p',
  { id: 'the-text', className: 'text' },
  ['Hello world4'],
  createElement(Greeting, { name: 'jaian' })
);

// 描画元の親要素を取得する
const root = document.getElementById('root');

// React 要素を描画する
ReactDOM.render(element, root);
