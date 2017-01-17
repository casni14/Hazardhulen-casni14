import { Component, OnInit } from '@angular/core';

import "/socket.io/socket.io.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

showActions = false;
showLeave = false;
showJoin = true;


joinTable(): void {
            this.showActions = !this.showActions;
            this.showJoin = !this.showJoin;
            this.showLeave = !this.showLeave;
            var name = prompt("Enter your nickname");
            this.socket.emit('joinTable', name);
        } 

ngOnInit(): void {
}

nickColor = ["red", "blue", "orange", "purple", "pink", "yellow"];
port = location.port;
ID = null;

socket = io.connect(location.protocol+"//"+location.hostname+":" + this.port + "/");


            socket.on('updateTableState', function (boardState) {
            //Handle Board State
            reset();
            console.log("Updating Board State: " + JSON.stringify(boardState));
            var boardState = JSON.parse(boardState);

            console.log(boardState);
            updatePlayers(boardState);

            $.each(boardState.dealerHand, function (i, card) {
                addCard(6, card, i);
                $("#_score7").html(boardState.dealerScore.toString());
                //console.log(boardState.dealerHand);
            });

            if (boardState.state == "postGame") {
                startTimer(15000);
            }


        });

        socket.on('setId', function (id) {
            ID = id;
        });

        function reset() {
            $('.playerScore').each(function (i, obj) {
                $(this).html("");
            });
            $('.playerName').each(function (i, obj) {
                $(this).html("");
            });
            $("#_score7").html("");
            $("#_player7").html("");
            //Should be loop but lazy
            $("#cardHolder").html('<div class="playerSlot" id="_player1"></div><div class="playerSlot" id="_player2"></div><div class="playerSlot" id="_player3"></div><div class="playerSlot" id="_player4"></div><div class="playerSlot" id="_player5"></div><div class="playerSlot" id="_player6"></div>');
        }

        function updatePlayers(board) {

            $.each(board.activePlayers, function (i, player) {

                $.each(player.hand, function (ii, card) {
                    addCard(i, card, ii)
                });

                //Update Score
                $("#_score" + (i + 1)).html(player.score.toString());
                //Update Name and Info
                var nameObj = $("#_name" + (i + 1));
                nameObj.html(player.nickname.toString());
                nameObj.css("color", NickColor[i]);
                nameObj.append("<br><span style='color:white'>Bet: "+player.bet+"$</span>");
                nameObj.append("<br><span style='color:white'>Cash: "+player.balance+"$</span>");

                if (player.id == ID) {
                    $("#currentBet").html(player.bet);
                    $("#cash").html(player.balance);
                    $("_player" + i).css("background-color", "darkgreen");
                    if (board.turnHolder == i && board.state == "playing") {
                        $('#hit').show();
                        $('#stand').show();
                    } else {
                        $('#hit').hide();
                        $('#stand').hide();
                    }
                    if (board.state == "idle") {
                        $('#bet').show();
                    } else {
                        $('#bet').hide();
                    }
                }
                var iplayer = i + 1;
                if (board.turnHolder == i && board.state != "idle") {
                    $("#_player" + iplayer).css("border", "2px solid red");
                    $("#_score" + iplayer).css("border", "2px solid red");
                } else {
                    $("#_player" + iplayer).css("border", "2px solid darkslategrey");
                    $("#_score" + iplayer).css("border", "2px solid darkslategrey");
                }
            });

        }

        function startTimer(time) {
            console.log("Started timer @"+time);
            $("#time").html((time / 1000) + 1);
            updateTimer();
        }

        function updateTimer() {
            var time = parseInt($("#time").html()) - 1;
            $("#time").html(time);
            if (time > 0) {
                setTimeout(updateTimer, 1000);
            }
        }

        function addCard(seat, card, i) {
            //console.log(seat + " " + card + " " + i);
            //margin-left:" + (i * -20) + "px
            $("#_player" + (seat + 1)).append("<img src='img/cards/" + card + ".png' style='width:100px;height:145px;margin-top:" + (i * -135) + "px' />");
        }

        

        function bet() {
            var amount = prompt("Please enter the amount you wish to bet.", "5");
            socket.emit('bet', amount);
        }

        function hit() {
            socket.emit('hit')
        }

        function stand() {
            socket.emit('stand')
        }

        function leaveTable() {
            $('#join').show();
            $('#leave').hide();
            socket.emit('leaveTable')
        }
}

  