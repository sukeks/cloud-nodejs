/*
   Copyright 2016, Google, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var url = require('url');

module.exports = function(config) {

  var gcloud = require('gcloud');

  var dataset = gcloud.datastore.dataset({
    projectId: config.projectId,
    keyFilename: config.keyFilename
  });

  function getAllBooks(callback) {
    var query = dataset.createQuery(['Book']);
    dataset.runQuery(query, callback);
  }

  function getUserBooks(userId, callback) {
    callback(new Error('books.getUserBooks [Not Yet Implemented]'));
  }

  function addBook(title, author, coverImageData, userId, callback) {
    if (coverImageData)
      return callback(new Error("books.addBook image saving Not Yet Implemented"));

    var entity = {
      key: dataset.key('Book'),
      data: {
        title: title,
        author: author
      }
    };

    dataset.save(entity, callback);
  }

  function deleteBook(bookId, callback) {
    var key = dataset.key(['Book', bookId]);
    dataset.delete(key, callback);
  }

  return {
    getAllBooks: getAllBooks,
    getUserBooks: getUserBooks,
    addBook: addBook,
    deleteBook: deleteBook
  };
};
