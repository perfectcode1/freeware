# jsPhpDate
This is an easy to use javascript date extension that enables you to use php style date formats.

To use, simple include the [ jsPhpDate.js ](https://api.ultison.com/jsPhpDate.min.js)  file in your project.

*_You may use this link in your html header for use in a browser:_*

 ```
<script type="text/javascript" src="https://api.ultison.com/jsPhpDate.min.js" ></script>
  ```
*_or this (to use locale text):_*

 ```
<script type="text/javascript" src="https://api.ultison.com/jsPhpDateLocale.min.js" ></script>
  ```

# Examples
```
dateformat = "j-F-Y";
dateformat2 = "D, j M Y H:i:s O";
dateformat3 = "j.n.Y H:iP";
dateformat4 = "l jS \\o\\f F Y h:i:s A";

console.log(new Date().toPhp(dateformat));
console.log(new Date().toPhp(dateformat2));
console.log(new Date().toPhp(dateformat3));
console.log(new Date().toPhp(dateformat4));

const example = new Date();
console.log(example.toPhp("Y-m-d g:i a"));
```


### PHP DATE CONSTANTS ARE ALSO SUPPORTED
```
let date = new Date("2024-5-8 22:25:30").toPhp(PHP_DATE_RFC2822);

console.log(date);
```

### For locale, pass the locale code with the key `locale` an object to the `Date.toPhp()` method as the second parameter, as shown in the example below:

+ `let localeDate = new Date().toPhp(PHP_DATE_COOKIE,{locale:"ru"})`

### DST is used by default. To turn it off, see the example below:
```
anotherexample = new Date;

console.log(anotherexample.toPhp(dateformat4,{dst:false}));

console.log(anotherexample.toPhp(PHP_DATE_RSS,{locale:"zh-hk",dst:false}));
```

+ Note that the locale does not alter the date settings.
+ This extention will only display the set date.
+ You may use other date manipulation tools as needed, then call the `.toPhp()` method to display the date using php style formatting.


