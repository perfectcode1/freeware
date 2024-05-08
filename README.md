# Freeware
This is an easy to use javascript date extension that enables your to use php style date formats.

To use, simple include the [ jsPhpDate.js ](https://github.com/perfectcode1/jsPhpDate/blob/94cd1d3dbd66925e1a7c5cc930c8ec47d50d6630/jsPhpDate.min.js)  file in your project.

# Examples
```
dateformat = "j-F-Y";
dateformat2 = "D, j M Y H:i:s O";
dateformat3 = "j.n.Y H:iP";
dateformat4 = "l jS \\o\\f F Y h:i:s A";

console.log(new Date().phpFormat(dateformat));
console.log(new Date().phpFormat(dateformat2));
console.log(new Date().phpFormat(dateformat3));
console.log(new Date().phpFormat(dateformat4));

const example = new Date();
console.log(example.phpFormat("Y-m-d g:i a"));
```


### PHP DATE CONSTANTS ARE ALSO SUPPORTED
```
let date = new Date("2024-5-8 22:25:30").phpFormat(PHP_DATE_RFC2822);

console.log(date);
```

### For locale, pass the locale code with the key `locale` an object to the `Date.phpFormat()` method as the second parameter, as shown in the example below:

+ `let localeDate = new Date().phpFormat(PHP_DATE_COOKIE,{locale:"ru"})`

### DST is used by default. To turn it off, see the example below:
```
anotherexample = new Date;

console.log(anotherexample.phpFormat(dateformat4,{dst:false}));

console.log(anotherexample.phpFormat(PHP_DATE_RSS,{locale:"zh-hk",dst:false}));
```

+ Note that the locale does not alter the date settings.
+ This extention will only display the set date.
+ You may use other date manipulation tools as needed, then call the `.phpFormat()` method to display the date using php style formatting.


