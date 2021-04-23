import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

export default () => {
    error({
  title: 'Oh No!',
  text: 'Please, enter some words, or letters'
});
}