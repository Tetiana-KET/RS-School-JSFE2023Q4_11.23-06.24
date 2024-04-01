console.log(`Self-esteem: 195 / 215
Привет, если есть возможность, не спеши пожалуйста, еще в процессе. Спасибо
Не реализовано:
- [ ] Sorting Functionality (10 points): Allow users to sort the table by the number of wins and best time, in ascending or descending order.;
 - [ ] Winner Announcement (10 points): After some car finishes first user should see the message contains car's name that shows which one has won.


**🏁 Basic Structure (85 points)**
  - [x] **1. View Configuration (30 points)**
    - [x] Two Views (10 points): Implement two primary views: 
        - [x] "Garage" (5 points)
        - [x] "Winners". (5 points)
    - [x] Garage View Content (5 points): must display its name, the current page number, and the total number of cars 
    - [x] Winners View Content (5 points): display its name, the current page number, and the total count of records 
    - [x] Persistent State (10 points): Ensure the view state remains consistent when navigating between views. This includes preserving page numbers and input states. 
  - [x] **2. Garage View Functionality (55 points)**
    - [x] **Car Management (45 points)**
      - [x] CRUD Operations (20 points): create, update, delete, display the list of cars. A car has  "name" and "color". 
      - [x] For "delete"-operation car should be deleted from "garage" table as well as from "winners".
      - [x] Color Selection (10 points): Allow color selection from an RGB palette 
      - [x] Management Buttons (5 points): Provide buttons near each car's image for updating its attributes or deleting it.
      - [x] Pagination (10 points): Implement pagination for the "Garage" view, displaying 7 cars per page.
    - [x] **Car Generation (10 points)** There should be a button to create random cars (100 cars per click). 
  - [x] **3. 🚗 Car Animation (50 points)**
    - [x] Engine Control Buttons (10 points): Place start/stop engine buttons near each car's image.
    - [x] Start Engine Animation (20 points): User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.
    - [x] Stop Engine Animation (10 points): User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
    - [x] Button States (5 points): Start engine button should be disabled in case car is already in driving mode. 
    - [x] As well as stop engine button should be disabled when car is on it's initial place.
    - [x] Responsive Animation (5 points): Ensure car animations are fluid and responsive on screens as small as 500px.
  - [ ] **4. 🏎️ Race Animation (25 points)**
    - [x] Start Race Button (15 points): Implement a button to start the race for all cars on the current page.
    - [x] Reset Race Button (10 points): Create a button to reset the race, returning all cars to their starting positions.
    - [ ] Winner Announcement (10 points): After some car finishes first user should see the message contains car's name that shows which one has won.
  - [ ] **5. 🏆 Winners View (35 points)**
    - [x] Display Winners (15 points): After some car wins it should be displayed at the "Winners view" table.
    - [x] Pagination for Winners (10 points): Implement pagination for the "Winners" view, with 10 winners per page.
    - [x] Winners Table (10 points): include car's №, image, name, number of wins, and best time in seconds. 
    - [x] If the same car wins more than once the number of wins should be incremented while best time should be saved
    - [ ] Sorting Functionality (10 points): Allow users to sort the table by the number of wins and best time, in ascending or descending order.`);
