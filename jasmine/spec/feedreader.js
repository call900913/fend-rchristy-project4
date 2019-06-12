/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have urls', function() {
           allFeeds.forEach(element => {
             expect(element.url.length).not.toBe(0);
           });
         });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have non-empty strings as names', function() {
           allFeeds.forEach(element => {
             expect(element.name.length).not.toBe(0);
           });
         });
    });


    describe('The menu', function() {
      var body = document.querySelector('body');

      /* This is a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('is hidden by default', function() {
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });

      /* This is a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
       it('changes visibility when clicked', function() {
         /* So what we are doing here is simulating the click without actually
          * firing a click event. So the route I've taken to do that is to fire
          * what happens after the click event fires: the class toggle.
          */
         body.classList.toggle('menu-hidden');
         expect(body.classList.contains('menu-hidden')).toBe(false);
         body.classList.toggle('menu-hidden');
         expect(body.classList.contains('menu-hidden')).toBe(true);
       });

    });


    describe('Initial Entries', function() {
      /* This is a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('should have non-empty feed container', function(done) {
        var list = document.querySelector('.feed').querySelectorAll('.entry-link');
        expect(list.length).not.toBe(0);
        done();
      });
    });


    describe('New Feed Selection', function() {
      var list1, list2;

      /* This is a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * loadFeed() is asynchronous.
       */
      beforeEach(function(done) {
        // loadFeed(1, loadFeed(2, done));
        loadFeed(1, function() {
          list1 = document.querySelector('.feed').querySelectorAll('.entry-link');
          loadFeed(2, done);
        });
      });

       it('should have different content', function(done) {
         list2 = document.querySelector('.feed').querySelectorAll('.entry-link');
         expect(list2).not.toBe(list1);
         done();
       });
    });


}());
