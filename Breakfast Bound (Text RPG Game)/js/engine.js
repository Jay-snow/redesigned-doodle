	/**GAME INITIALIZATION**/
	dialogueText = ["@Oh hey. Welcome back! The next thing you should do is finish making me. ",
				 "@Me being the text box. Maybe shape up the text so I don't look so ugly too...",
				  "@Then you should make the health look OK too. Haha. You're doing a great job!",
                  "@It's hard to program every night at 8-9PM eh?",
                  "@You've come really far"
                  ]
	sceneCount = -1; //iterates through a scene
    

    messageSkip = false;
    textSpeed = 35; //The interval at which text is written. The smaller the number the faster text displays. Change this number to change text display speed.
    setupString = ""
    writeMessage(setupString);

	//writeMessage(dialogueText[0]); //This starts the game, oddly enough. Where should this be?

	/** writeMessage function will write out the text RPG style **/
	  function writeMessage(string) {
	  	runningText.innerHTML = "";  //Prepare for write by empyting box and resetting timer.
	    var i = 0, intervalId;
	    messageRunTime = (string.length * textSpeed); // Calculate how long it will take for the string to write. Used to tell if text should auto-complete or skip to next dialogue.
	    messageRunTimer = 0; 
	    intervalId = window.setInterval(function() {
	        runningText.innerHTML += string.charAt(i++);
	        messageRunTimer += textSpeed;
	        if (i > string.length || messageSkip == true) 
	            window.clearInterval(intervalId); 
	      }, textSpeed);
	    builtText.innerHTML = string; //Make a pre-built version of the text in case the user skips.
    }

   

    /**Move Forward in Dialogue && Advance the scene **/

    	

    	function sceneIncrement(sceneName) {
    		//If the message is done OR the player has chosen to skip, advance the diagloue.
    		if (messageRunTimer >= messageRunTime || messageSkip == true) {
    		sceneCount += 1;

            
    		writeMessage(sceneName[sceneCount]);
    		messageSkip = false;
    		runningText.style.display = "block";
    		builtText.style.visibility = "hidden";
    	} else

    		//If the message is NOT done, skip to the end.
    		if (messageRunTimer <= messageRunTime && messageSkip == false) {
    			runningText.style.display = "none";
    			builtText.style.visibility = "visible";
    			messageSkip = true;
    		}
    	}

        //Runs sceneIncrement on spacebar or mouse click
    	document.onkeypress = function(e) {
  		  document.body.onkeyup = function(e){
  		  if(e.keyCode === 32 || e.key === ' '){
            sceneIncrement(dialogueText);
    }
}
};
 

 /** Combat Engine Stuff **/

 health = 10;
 speed = 0;
 defense = 0;
 attack = 0;
 accuracy = 0;

 combatDialogue = ["You try to say something smart.", "You try to say something smart."]

 

    /** Create combat options **/
    function combatOptionsDisplay() {

        combatOptions.innerHTML ="<ul> <li onclick='combatTalk();' id='talk' class='combatChoice'>Talk</li> <li class='combatChoice'>News</li> <li class='combatChoice'>About</li> </ul> ";
    }

    function combatTalk() {
        
         health -= 5;
        refreshStats();

        sceneIncrement(combatDialogue);
    //   writeMessage(combatDialogue[0]);
       

    }

 //   var talk = document.getElementById("talk");
 //   talk.addEventListener("click", combatTalk, false);
   
 function refreshStats() {
hp.innerHTML = health + "/10";
}

combatOptionsDisplay();

