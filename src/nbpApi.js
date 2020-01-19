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

  rate(currency = '') {
    let ret = 0;
    if (['', 'PLN'].includes(currency)) {
      ret = 1;
    } else {
      const found = this.rates.filter(element => element.code === currency);
      if (found.length) ret = found[0].mid;
    }
    return ret;
  }
};

const EC = (currency, value) => {
  return value * nbpApi.rate(currency);
};
