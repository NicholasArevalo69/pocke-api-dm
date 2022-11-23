import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<pocke-api-dm></pocke-api-dm>
```

##styling-doc

@customElement pocke-api-dm
*/
export class PockeApiDm extends LitElement {
  static get is() {
    return 'pocke-api-dm';
  }

  // Declare properties
  static get properties() {
    return {
      url: { type: String, },
      method: { type: String, }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.url = null;
    this.method = null;
  }

  firstUpdated(){
    this.getData();
  }

  _sendData(data){
    this.dispatchEvent(new CustomEvent('pokeData', {
      bubbles: true,
      composed: true,
      detail: { data }
    }))
  }

  getData() {
    fetch(this.url, { method: this.method})
      .then((response) => {
        if(response.ok){
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        this._sendData(data)
      })
      .catch((error) => {
        console.warn('Fallo el consumir la PokeApi', error);
      })
  }

}
