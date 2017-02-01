
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('articles').insert({ user_id: 1, title: "LinkedList", body: "In computer science a Linked list is a collection od data elements each pointing to the next node by means of a pointer. It is a data structure which together represents a sequence, Under the simplest form each node is composed of data and a reference to the next node in the sequence. This allows for efficient insertion or removal of elements from any position in the sequence during iteration. More complex variants add additional links, allowing efficient insertion or removal from arbitrary element references."}),
        knex('articles').insert({ user_id: 2, title: "Graph Data Structure", body:"graph. (data structure) Definition: A set of items connected by edges. Each item is called a vertex or node. Formally, a graph is a set of vertices and a binary relation between vertices, adjacency."}),
        knex('articles').insert({ user_id: 3, title: 'Trie Data Structure', body: "In computer science, a trie, also called digital tree and sometimes radix tree or prefix tree (as they can be searched by prefixes), is a kind of search tree—an ordered tree data structure that is used to store a dynamic set or associative array where the keys are usually strings."})
      ]);
    });
};
