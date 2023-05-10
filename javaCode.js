// Java Code
// javaCode.js



// Var Dec
    var gameStarted=false;
    var gameOver=false;
    var gameResult="";
    var methodOfConclusion="";
    var whiteName;
    var blackName;
    var html;
    var pgnInfo = "";
    var pgnMoves = "";
    var pgnFull = "";
    var x = "whiteMove";
    var y = 0;
    var whosMove = true; //true=wite false=black
    var highlightedCell = 1; // Skip Number, 1, 2 - Next Line - Skip, 3, 4 - Next Line - Skip, 5, 6
    var tableArray = [{
        moveNum: 1,
        moveNumFormated: "1.",
        whiteMove: "",
        blackMove: "",
        whiteMoveComplete: false,
        blackMoveComplete: false,
        whiteMoveID: 1,
        blackMoveID: 2
    }];
    var moves = [{
        moveID: 0, // This is the same as the array row for ease of use. This row is just a blank.
        piece: "",
        modNum: 0,
        modLetter: "",
        letter: "",
        number: 0,
        kCastle: false,
        qCastle: false,
        castle: "",
        moveComplete: false
    }, {
        moveID: 1, // This is the same as the array row for ease of use. This row is just a blank.
        piece: "",
        modNum: 0,
        modLetter: "",
        letter: "",
        number: 0,
        kCastle: false,
        qCastle: false,
        castle: "",
        moveComplete: false
    }, {
        moveID: 2, // This is the same as the array row for ease of use. This row is just a blank.
        piece: "",
        modNum: 0,
        modLetter: "",
        letter: "",
        number: 0,
        kCastle: false,
        qCastle: false,
        castle: "",
        moveComplete: false
    }];



// Functions
    // Refresh Functions

        function transferMoveData() {
            //console.log("data")
            for (var i = 0; i < (tableArray.length); i++) {
                // console.log(i)
               

               var tempWhiteMoveID = tableArray[i].whiteMoveID
               //console.log(tempWhiteMoveID)
                //white
                if (moves[tempWhiteMoveID].modNum==0){var modNumberW=""} else {var modNumberW=moves[tableArray[i].whiteMoveID].modNum}
            

                if (moves[tableArray[i].whiteMoveID].number==0){var numberW=""} else {var numberW=moves[tableArray[i].whiteMoveID].number}
                
                
                if (moves[tableArray[i].whiteMoveID].kCastle){
                    tableArray[i].whiteMove = "0-0"
                } else{
                    if (moves[tableArray[i].whiteMoveID].qCastle){
                        tableArray[i].whiteMove = "0-0-0"
                    } else{
                        tableArray[i].whiteMove = 
                            moves[tableArray[i].whiteMoveID].piece +  
                            modNumberW+
                            moves[tableArray[i].whiteMoveID].modLetter +
                            moves[tableArray[i].whiteMoveID].letter +
                            numberW
                    }
                }

                //black
                if (moves[tableArray[i].blackMoveID].modNum==0){var modNumberB=""} else {var modNumberB=moves[tableArray[i].blackMoveID].modNum}

                if (moves[tableArray[i].blackMoveID].number==0){var numberB=""} else {var numberB=moves[tableArray[i].blackMoveID].number}
                
                
                if (moves[tableArray[i].blackMoveID].kCastle){
                    tableArray[i].blackMove = "0-0"
                } else{
                    if (moves[tableArray[i].blackMoveID].qCastle){
                        tableArray[i].blackMove = "0-0-0"
                    } else{
                        tableArray[i].blackMove = 
                            moves[tableArray[i].blackMoveID].piece +  
                            modNumberB+
                            moves[tableArray[i].blackMoveID].modLetter +
                            moves[tableArray[i].blackMoveID].letter +
                            numberB
                    }
                }

            

            

            

            } }

        function generateTable() {
            var highlightedCellCounter = 0
            html = "<table class=\"tableGrid\"><tbody>";
            for (var i = 0; i < tableArray.length; i++) {
                html += "<tr>" 
                html += "<td class=\"tableNumCell\">"+tableArray[i].moveNumFormated+"</td>"

                highlightedCellCounter ++ 
                if (highlightedCellCounter == highlightedCell) {
                    if (moves[(tableArray[i].whiteMoveID)].moveComplete) {
                        html += "<td class=\"highlightGreen tableMoveCell\" onclick=\"goTo("+highlightedCellCounter+")\">"+tableArray[i].whiteMove
                    } else {
                        html += "<td class=\"highlight tableMoveCell\" onclick=\"goTo("+highlightedCellCounter+")\">"+tableArray[i].whiteMove
                    }
                } else {
                    html += "<td class=\"tableMoveCell\" onclick=\"goTo("+highlightedCellCounter+")\">"+tableArray[i].whiteMove
                } highlightedCellCounter ++ 
                html += "</td>"
        
                if (highlightedCellCounter == highlightedCell) {
                    if (moves[(tableArray[i].blackMoveID)].moveComplete) {
                        html += "<td class=\"highlightGreen tableMoveCell\" onclick=\"goTo("+highlightedCellCounter+")\">"+tableArray[i].blackMove
                    } else {
                        html += "<td class=\"highlight tableMoveCell\" onclick=\"goTo("+highlightedCellCounter+")\">"+tableArray[i].blackMove
                    }
                } else {
                    html += "<td class=\"tableMoveCell\" onclick=\"goTo("+highlightedCellCounter+")\">"+tableArray[i].blackMove
                }
                // console.log(html)
                html += "</td>"
                html += "</tr>" 
            }
            html+="</tbody></table>";
        
            if (highlightedCell% 2 == 0 ) {
                //Black is hilighted
                whosMove = false
            } else {
                //White is hilighted
                whosMove = true
            }
            
        
            document.getElementById("notationTable").innerHTML = html;
            
            // document.getElementById("nTable").innerHTML = html;
        }

        function getHilightedCoordiates() {
            if (highlightedCell% 2 == 0 ) {
                //Black is hilighted
                whosMove = false
            } else {
                //White is hilighted
                whosMove = true
            }
            
            if (whosMove) {
            x="whiteMove"
            y=[(highlightedCell+1)/2]-1
            } else {
            x="blackMove"
            y=[highlightedCell/2]-1
            }
        //    y=tableArray.length
        //    y --
        
        
           
        }

        function createPGN() {

            var tempSubtractedLengh = tableArray.length
            tempSubtractedLengh --
            pgnFull = ""
            pgnInfo = ""
            pgnMoves = ""

            //Info
                pgnInfo ="[White \""+whiteName+"\"] \n"+"[Black \""+blackName+"\"]  \n"+"[Result \""+gameResult+"\"]"


            //Moves
                for (var i = 0; i < tableArray.length; i++) {
                    if (i == (tempSubtractedLengh) && tableArray[i].whiteMove=="") {
                        
                    } else {
                        pgnMoves += tableArray[i].moveNumFormated +" "+ tableArray[i].whiteMove +" "+ tableArray[i].blackMove +" "}
                }


            //Combine
                pgnFull = pgnInfo + "\n" + pgnMoves
                // console.log(pgnFull)
        
        }

        
        function checkForCompleteMove () {
            var tempMoveID = 0

                if (whosMove) {
                    tempMoveID = (tableArray[y].whiteMoveID)
                } else {
                    tempMoveID = (tableArray[y].blackMoveID)
                }


            if (
                (moves[tempMoveID].castle != "" && (moves[tempMoveID].kCastle || moves[tempMoveID].qCastle))
                || (moves[tempMoveID].letter != "" && moves[tempMoveID].number != "")
            ) {
                moves[tempMoveID].moveComplete = true
            }

        }


        function refresh() {
            getHilightedCoordiates()
            transferMoveData()
            checkForCompleteMove()
            generateTable()
            createPGN()
        }

    // In-Game Funtions
        function goTo (newNum) {
            if (whosMove) {
                if (highlightedCell<newNum&&(moves[tableArray[y].whiteMoveID].moveComplete == false)) {
                
                } else {
                    highlightedCell = newNum
                    refresh ()
                }
            } else {
              if (highlightedCell<newNum&&(moves[tableArray[y].blackMoveID].moveComplete == false)) {
                
                } else {
                    highlightedCell = newNum
                    refresh ()
                }  
            }
            

        }

        function newGame(){
            var confirm = true
            if (gameOver == false && gameStarted == true) {
                confirm = window.confirm ("Are you sure you want to end this game?")
            }
            if (confirm) {
                whiteName = prompt ("White Name")
                document.getElementById("whitePlayer").innerHTML = "White Player: " + whiteName;
            
                blackName = prompt ("Black Name")
                document.getElementById("blackPlayer").innerHTML = "Black Player: " + blackName;
                gameStarted = true
                gameOver = false

                var tempSubtractedLengh = tableArray.length
                tempSubtractedLengh --

                var tempSubtractedLenghMoves = moves.length
                tempSubtractedLenghMoves --
                tempSubtractedLenghMoves --
                tempSubtractedLenghMoves --

        
            
                moves.splice(3, tempSubtractedLenghMoves)
                tableArray.splice(1,  (tempSubtractedLengh))

                for (var i = 1; i < (moves.length); i++) {
                    highlightedCell = i
                    del()
                }

                highlightedCell = 1

                
            } 
            refresh ()

        } 

        function back() { 
            
            if (highlightedCell>1) {
                highlightedCell --; 
            }
            refresh()
        }

        function next() { 
            var lastRow = tableArray.length
            lastRow --
            if (whosMove) {
                if (moves[tableArray[lastRow].whiteMoveID].moveComplete) {
                    highlightedCell ++
        }} else {
            if (moves[tableArray[lastRow].blackMoveID].moveComplete) {
               
                if ([tableArray.length*2]>highlightedCell){
                    highlightedCell ++; }
                else {
                    addRow()
                    highlightedCell++
                    refresh()
                    
                }
            }
            }
            
            refresh()
        }

        function del() {
            refresh()
            //tableArray[y][x] = ""

            var whiteORblack = x
            whiteORblack += "ID"

            var a = tableArray[y][whiteORblack];
            
            // console.log(tableArray[y][whiteORblack])
            // console.log("mod: "+tableArray[0].whiteMoveComplete)
            // console.log(a)
            
            // console.log("x: "+x)
            // console.log("y: "+y)
            // console.log(whiteORblack)

            moves[a].piece = ""
            moves[a].modNum = 0
            moves[a].modLetter = ""
            moves[a].letter = ""
            moves[a].number = 0
            moves[a].kCastle = false
            moves[a].qCastle = false
            moves[a].castle = false
            moves[a].moveComplete = false

            


            // tableArray[0].whiteMove = "" 
        
            // console.log ("y: "+y)
            // console.log ("x: "+x)
        
            refresh()
        }

        function addRow() {
            var totalRowsFormated = tableArray.length
            totalRowsFormated ++
            totalRowsFormated += "."
            
            

            var whiteNum = moves.length++
            

            moves.splice(whiteNum, 0, {
                moveID: whiteNum,
                piece: "",
                modNum: 0,
                modLetter: "",
                letter: "",
                number: 0,
                kCastle: false,
                qCastle: false,
                castle: "",
                moveComplete: false
            });
            

            var blackNum = whiteNum
            blackNum++
            //console.log ("start: "+blackNum)


            
            moves.splice(blackNum, 0, {
                moveID: blackNum,
                piece: "",
                modNum: 0,
                modLetter: "",
                letter: "",
                number: 0,
                kCastle: false,
                qCastle: false,
                castle: "",
                moveComplete: false
            });
            
            var tempNeededCollum = tableArray.length
            tempNeededCollum --
            var tempMoveNum = tableArray [tempNeededCollum].moveNum
            tempMoveNum ++

            tableArray.splice(tableArray.length, 0, {
                moveNum: tempMoveNum,
                moveNumFormated: totalRowsFormated,
                whiteMove: "",
                blackMove: "",
                whiteMoveComplete: false,
                blackMoveComplete: false,
                whiteMoveID: whiteNum,
                blackMoveID: blackNum
            });

        
            refresh()
            next()
        }

        function tableHeight () {
            var leftHeight = document.getElementById('allButTable').offsetHeight;

        }
 
    // Add to notation

        function anyButtonClickCheckStart () {
            if (gameStarted == false) {
               
                alert ("Please start a new game before entering data! ;) ")

            }

        }

        function pieceButton(whichPiece) {
            anyButtonClickCheckStart()
            if (gameStarted){
            
                var tempPiece = whichPiece
                
                refresh()

                var tempMoveID = 0
                if (whosMove) {
                    tempMoveID = (tableArray[y].whiteMoveID)
                } else {
                    tempMoveID = (tableArray[y].blackMoveID)
                }
                 moves[tempMoveID].piece = tempPiece

                refresh()
        }}

        function castles (kingSideBool) {  
            anyButtonClickCheckStart()
            if (gameStarted){
            
                var tempCastle = ""
                
                refresh()

                del ()

                var tempMoveID = 0
                if (whosMove) {
                    tempMoveID = (tableArray[y].whiteMoveID)
                } else {
                    tempMoveID = (tableArray[y].blackMoveID)
                }

                if (kingSideBool) {
                    tempCastle = "0-0"
                    moves[tempMoveID].kCastle = true
                    moves[tempMoveID].qCastle = false
                } else {
                    tempCastle = "0-0-0"
                    moves[tempMoveID].qCastle = true
                    moves[tempMoveID].kCastle = false
                }

                 moves[tempMoveID].castle = tempCastle

                refresh()
        } }

        function letter(letterRecived) {
            anyButtonClickCheckStart()
            if (gameStarted){
            
                var tempLetter = letterRecived
                
                refresh()

                var tempMoveID = 0

                if (whosMove) {
                    tempMoveID = (tableArray[y].whiteMoveID)
                } else {
                    tempMoveID = (tableArray[y].blackMoveID)
                }
                 
                if (moves[tempMoveID].letter != "") {
                    if (moves[tempMoveID].modLetter == "" && moves[tempMoveID].modNum == "") {
                        moves[tempMoveID].modLetter = moves[tempMoveID].letter
                    }
                } 

                moves[tempMoveID].letter = tempLetter

                refresh()
        }}

        function number(numberRecived) {
            anyButtonClickCheckStart()
            if (gameStarted){
            
                var tempNumber = numberRecived
                
                refresh()

                var tempMoveID = 0

                if (whosMove) {
                    tempMoveID = (tableArray[y].whiteMoveID)
                } else {
                    tempMoveID = (tableArray[y].blackMoveID)
                }
                 
                if (moves[tempMoveID].number != "" && moves[tempMoveID].modLetter == "") {
                    if (moves[tempMoveID].modNum == "") {
                        moves[tempMoveID].modNum = moves[tempMoveID].number
                    }
                } 

                if (moves[tempMoveID].letter == ""){
                moves[tempMoveID].modNum = tempNumber
            } else {
                moves[tempMoveID].number = tempNumber
            }

                refresh()
        }}

        function endGame (result) {
            anyButtonClickCheckStart()
            if (gameStarted){
            var confirm = window.confirm ("Are you ready to end the game?")
            if (confirm) {
                    if (result == "d") {
                        gameResult = "1/2-1/2"
                    } else {
                        if (result == "w") {
                            gameResult = "1-0"
                        } else {
                            gameResult = "0-1"
                        }
                    }
                gameOver = true
                gameStarted = false
                createPGN()
                refresh()
            }}
        }

    // Popup
        function openPopup () {
            popup = document.getElementById("popup1")
            popup.style.display = "block"
        }

        function closePopup () {
            popup = document.getElementById("popup1")
            popup.style.display = "none"
        }
    // Export
        function download(filename, text) { //Thanks to https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
        
            element.style.display = 'none';
            document.body.appendChild(element);
        
            element.click();
        
            document.body.removeChild(element);
        }
        function pgnExport () {
            if (gameOver) {
                refresh()
                download("pgn.txt", pgnFull);
            } else {
                alert("Please end a game befor exporting a PGN! ;)")
            } 
            
        }




