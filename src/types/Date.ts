export interface DateInterface
{
  month: number;
  day: number;
  year : number;
}

export class Date implements DateInterface {
  private _month? : number;
  private _day? : number;
  private _year? : number;

  constructor(month: number, day: number, year: number)
  {
    this.month = month;
    this.day = day;
    this.year = year;
  }

  set month(value : number)
  {
    if(value < 1 || value > 12)
    {
      throw new Error("Invalid month number");
    }
    this._month = value;
  }

  set day(value: number)
  {
    if(value > 0 && value <= this.daysInMonth(this.month))
    {
      this._day = value;
    }
    else
    {
      throw new Error("Invalid day given");
    }
  }

  set year(value : number)
  {
    if(value > 0)
    {
      this._year = value;
    }
    else
    {
      throw new Error("Invalid year given");
    }
  }

  get month() : number
  {
    if(this._month !== undefined)
    {
      return this._month;
    }
    else
    {
      throw new Error("No Month!");
    }    
  }

  get monthAsString() : string
  {
    switch(this.month)
    {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        throw new Error("Invalid month number");
    }
  }

  get day() : number
  {
    if(this._day !== undefined)
    {
      return this._day;
    }
    else
    {
      throw new Error("No day!");
    }
  }

  get year() : number
  {
    if(this._year !== undefined)
    {
      return this._year;
    }
    else
    {
      throw new Error("No Year!");
    }
  }
  
  private daysInMonth(month: number) : number
  {
    if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12)
    {
      return 31;
    }
    else if(month === 2)
    {
      return 29;
    }
    else
    {
      return 30;
    }
  }

}