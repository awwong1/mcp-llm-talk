/**
 * Entry point for the client-side application.
 * This file initializes the Reveal.js presentation with the Markdown plugin.
 * It is bundled by Vite and served to the client.
 */
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize({
  hash: true,
});