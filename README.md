# LocalCoopOnlinePlayer
  #### 1. What does it do?
  >Allows for 2 people to play a Local Coop 
  >game inside a browser over the network.
  #### 2. How does it work(basic)?
  >Player 1 streams the game in the browser to Player 2 over the internet,
  >while Player 2 sends keypress events over the internet to Player 1 for
  >execution inside Player 1's browser tab.
  #### 3. How does it work(deeper explanation)?
  >Using a bookmarklet Player 1 will inject a script into a browser tab 
  >with the game he wants to stream. The script will stream the \<canvas\>
  >to Player 2 using WEBRTC (wrapper library [PeerJS](https://peerjs.com/)). 
  >Player 2 will use the WEBRTC connection to send information needed for
  > dispatchEvent(new KeyboardEvent()) to Player 1 so those key presses can
  > be simulated inside Player 1's browser tab.
  ## How to use?
      

