import './styles/normalize.css';
import './styles/style.css';
import './app/app';

console.log(` 
Score 215 / 250
  - [x] **1. User Authentication Page (+30)**
    - [x] (+10) The authentication form validates the entered data based on at least two different criteria.
    - [x] (+5) The user is unable to submit an authentication request with data that has not passed validation.
    - [x] (+5) In case of an authentication error, a message must be displayed.
    - [x] (+5) User authentication is possible both by clicking the button with the mouse or by pressing the "Enter"
    - [x] (+5) Access is granted only to not authenticated users.

  - [x] **2. Main Page (+10)**
    - [x] (+10) Access is granted only to authenticated users.

  - [x] **3. Header (on the main page) (+10)**
    - [x] (+3) Displays the current authenticated user's name.
    - [x] (+2) Displays the app's name.
    - [x] (+5) Includes a logout button which when pressed terminates the current session and opens the authentication form

  - [x] **4. Footer (on the main page) (+5)**
    - [x] (+5) Includes the school's logo and name, the author's name, a link to the author's GitHub, the year of the app creation.

  - [x] **5. User List (on the main page) (+20)**
    - [x] (+10) Displays all registered users and an indicator of each user's online status.
    - [x] (+5) The currently authenticated user is not in the list.
    - [x] (+5) Implements user search by name. The search will be case sensitive or case-insensitive at the student's discretion.
    - [ ] (+10) Displays information about the number of unread messages from each user.

  - [x] **6. User Dialogue (on the main page) (+40)**
    - [x] (+5) Provides information about the user with whom the dialogue is open, indicates whether that user is online.
    - [x] (+5) Provides a complete message history with the selected user, including messages from both the current user and the user with whom the dialogue is currently open.
    - [x] (+5) Arranges messages chronologically based on the time of sending. The latest message is displayed near the message input and send component.
    - [x] (+5) In the absence of message history, a message in the message history field indicates that this is the beginning of the dialogue.
    - [x] (+5) When sending a message to another user, the message history scrolls to the sent message (making the just-sent message visible to the user).
    - [x] (+5) When receiving a message from another user in an open dialogue, the message history scrolls to the received message (making the just-received message visible to the user).
    - [ ] (+5) When opening a dialogue with unread messages, new messages are separated from the read messages by a dividing line, and the user can see the dividing line and at least one unread message.
    - [ ] (+5) When new unread messages appear (before meeting the conditions to remove the dividing line), the line must always stay within the dialogue area and not hide in the scroll area.
    - [ ] (+5) The dividing line between read and unread messages can be removed by each of the following actions: when scrolling the message history area, after clicking the message send button, or clicking inside the message history area.
    - [x] (+5) If no recipient is selected, the message send button and message input field must be inactive (or hidden), and there must be a message in the message history field indicating the need to select a recipient.
    - [x] (+5) Sending a message to a user is possible both by clicking the send button with the mouse or by pressing the "Enter" key without the need to focus on the send button.
    - [x] (+10) The user can delete their own previously sent messages.
    - [x] (+10) The user can edit the text of their own previously sent messages.

  - [x] **7. Message Content (on the main page) (+25)**
    - [x] (+15) Messages include the time of sending, sender's username, message delivery status, message text, and indication of whether the message has been edited.
    - [x] (+5) The message "delivered"/"read" status is visible only to the sender of the message.
    - [x] (+5) A user cannot send a message without any content (without text).

  - [ ] **8. Message Delivery and Read Status (on the main page) (+20)**
      - [x] (+10) The status changes to "delivered" when the message recipient logs into the application or if the message is sent to the user who is online.
      - [ ] (+10) The status changes to "read" when the message recipient opens a dialogue with unread messages and performs any of the following actions: scrolls in the message history area, sends a new message, or clicks inside the message history area.

  - [x] **9. About Page (+10)**
    - [x] (+5) Contains brief information about the application and its author. The content is at the student's discretion.
    - [x] (+5) Access is granted to all users.

  - [x] **10. Interface and Visual Design (+15)**
    - [x] (+5) The browser tab must display the application icon.
    - [x] (+5) The interface elements with which the user will interact must be responsive and the cursor must change when they are hovered over.
    - [x] (+5) Responsive layout must be implemented for resolutions ranging from 1440 px to 380 px, inclusive.

  - [x] **11. Server Connection (on all pages) (+20)**
      - [x] (+10) If a sudden disconnection from the server occurs, a message must be displayed to the user, and an attempt to restore the connection must be made.
      - [x] (+10) Upon reconnecting to the server, the application must perform the current user reauthorization without requiring user intervention.
 `);
