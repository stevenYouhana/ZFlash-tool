
 export default class ESVapi {
   constructor() {
     this.params = {
        // 'include-headings': 'False',
        // 'include-footnotes': 'False',
        // 'include-verse-numbers': 'False',
        'include-short-copyright': 'False',
        // 'include-passage-references': 'False'
    }
   }
   _queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
   }
   fetch = (verse) => {
     return fetch(`https://api.esv.org/v3/passage/text?q=${verse}&${this._queryParams(this.params)}`, {
       method: 'get',
       headers: new Headers({
        'Authorization': 'Token 41b03fbfc090c4851eea025b8bb99825adfbe350',
        'Content-Type': 'application/json'
      })
     }).then(response => {
      return response.json();
    }).then(jsonResponse => jsonResponse.passages[0]);
  }
 }
