/**
 * Created by tung on 11/05/17.
 * connect to the mongoose
 */

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/wikiAnalysis', function () {
  console.log('mongodb connected');
});

module.exports = mongoose;