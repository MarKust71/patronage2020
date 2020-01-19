const nbpApi = {
  tableA: [],
  tableB: [],
  rates: [],

  _getTable: async (table = 'A') => {
    const apiUrl = 'http://api.nbp.pl/api/';
    const url = apiUrl + `exchangerates/tables/${table}/?format=json`;
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
  },

  async getRates() {
    const ret = [];
    let res;
    res = await this._getTable('A');
    this.tableA = [...res[0].rates];
    res = await this._getTable('B');
    this.tableB = [...res[0].rates];
    this.rates = [...this.tableA, ...this.tableB];
  },

  currency2PLN(currency = '', value) {
    let ret = 0;
    if (['', 'PLN'].includes(currency)) {
      ret = value;
    } else {
      const found = this.rates.filter(element => element.code === currency);
      if (found.length) ret = value * found[0].mid;
    }
    return ret;
  }
};

// nbpApi.getRates().then(() => console.log(nbpApi.rates));
