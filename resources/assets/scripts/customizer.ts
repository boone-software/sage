import $ = require('jquery');

declare const wp;

wp.customize('blogname', (value: Function) => {
  value.bind((to: string) => $('.brand').text(to));
});
