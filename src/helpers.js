export function makeHeader(s) {
  var header = s.charAt(0).toUpperCase();

  for(let i = 1; i < s.length; i++) {
    if(s.charAt(i) === s.charAt(i).toUpperCase()){
      header += ' ';
    }
    header += s.charAt(i);
  }

  return header;
}
