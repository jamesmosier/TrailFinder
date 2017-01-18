Documentation
--------------

# currently rewriting in react native

About Trail Finder v0.4
-----------------------
Trail Finder is an application that uses geolocation (a users current GPS location) and gives them feedback, telling them the closest trail heads* to them at that location. This project was derived out of a personal need to locate various towpath trails in the NE Ohio area.

*Trail heads can be found most often at parks and towpaths and are typically for walking or riding a bicycle.

Version Information (v0.4)
-----------------------------------
What it can do so far:
  1. Find a users location using GPS, return and pinpoint the 3 closest locations to them
  2. Return the correct 3 closest locations to the table
  3. Write out a list of 3 locations (not sorted yet)
  4. Give them an info window with location info

To Do:
  1. ~~Return the correct 3 closest locations to the table (already works on the map)~~
  2. ~All locations listed should have the exact distance (miles) from the users current location~
  	a. The above works, it just doesn't display the output in the correct DIV, yet.
  3. Add more data (currently there is only about 20 pieces of sample data in Fusion Tables),
  4. *More Results* should show '50' more of the closest locations.
    a. Need to create directive to update map plugins queryLimit to 50
    b. Reload page to show updated locations
    c. On reload it will obviously need to persist that queryLimit of 50
  5. Create **favorites** UI and workflow. Should be able to add/remove/sort favs.
  6. Create search functionality
  7. Add ability to swipe a row to show other options (or buttons to show options).
  8. Integrate with Phonegap in order for above to work (swipe gestures).

Libraries Used
--------------
Trail Finder uses many open source libraries to do cool stuff...
