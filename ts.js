// /**
//  * Created by tung on 31/05/17.
//  */
// a = ['s','f'];
//
// b = [].push(a);
// console.log(b);//1
//
// c = [];
// c.push(a);
// console.log(c);//[ [ 's', 'f' ] ]
//
// d = Array.prototype.push.call([], a);
// console.log(d);//1
// //thought e to have ['s','f']
// e = Array.prototype.push.apply([], a);//2
// console.log(e);
//
// f = [];
// f.push.call(f, a);
// console.log(f);//[ [ 's', 'f' ] ]
//
// g = [];
// g.push.apply(g, a);
// console.log(g);//[ 's', 'f' ]