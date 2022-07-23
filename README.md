# LocalCoopOnlinePlayer
  #### 1. What does it do?
  >Allows for 2 people to play a Local Coop <br>
  >game inside a browser over the network.
  #### 2. How does it work(basic)?
  >Player 1 streams the game in the browser to Player 2 over the internet, <br>
  >while Player 2 sends keypress events over the internet to Player 1 for <br>
  >execution inside Player 1's browser tab.
  #### 3. How does it work(deeper explanation)?
  >Using a bookmarklet Player 1 will inject a script into a browser tab 
  >with the game he wants to stream. The script will stream the \<canvas\>
  >to Player 2 using WEBRTC (wrapper library [PeerJS](https://peerjs.com/)). 
  >Player 2 will use the WEBRTC connection to send information needed for
  > dispatchEvent(new KeyboardEvent()) to Player 1 so those key presses can
  > be simulated inside Player 1's browser tab.
  ## How to use?
  #### Player 1 Steps:
  > 1. Create a bookmark and paste code from [bookmarklet](https://github.com/seamoose44499958/LocalCoopOnlinePlayer/blob/master/src/bookmarklet.txt "Can triple click to highlight all the code") inside bookmark URL. <br>
  > 2. Go to website that runs the game you want to play. <br>
  > 3. Wait for the game to load and click on the game to focus it. <br>
  > 4. Click on the bookmark to run the script inside the page. <br>
  > 5. If prompt tab appears prompting for a number to select canvas, input number of the canvas you want to stream(usually its 0 or out of the numbered options is called "stage0","gameplayer","game",etc). This may take some trial and error. <br>
  > 6. If it says that you selected an iframe please disable popups on the site. A new tab should open. Go to the new tab and close the old tab. Go back to step 3(You may loop back to step 3 multiple times depending on how much websites are embeded inside each other). <br>
  > 7.  If prompt tab appears prompting for a number to select iframe, enable popups and input number of iframe you want to open in new tab(usually its 0 or out of the numbered options is called "stage0","gameplayer","game",etc). A new tab should open. Go to the new tab and close the old tab. Go back to step 3(You may loop back to step 3 multiple times depending on how much websites are embeded inside each other). <br>
  > 8. You should see a alert with an id that you need to send to friend. Send it through a medium(through Email,SMS,etc) with the player you want to play the game with <br>
