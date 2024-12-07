const formatPhoneNumber = (str) =>
  str.length !== 10
    ? "Number must be 10 numbers long!"
    : `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6, 10)}`;

let output = formatPhoneNumber("8005551212");
console.log(output); // –> “(800) 555-1212”
