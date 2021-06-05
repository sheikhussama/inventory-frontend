export class Utils {
  static selectCurency() {
    const currencyList = [
      {
        value: "Dollar ($)",
      },
      {
        value: "Rupees (PKR)",
      },
      {
        value: "Pound (GBP)",
      },
      {
        value: "Dirham (AED)",
      },
    ];
    return currencyList;
  }

 static unitBased() {
    const unit: any = [
      {
        id: 'LTR',
        value: 'LTR',
      },
      {
        id: 'GRM',
        value: 'GRM',
      }
    ]
    return unit
  }


}
