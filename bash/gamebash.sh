#!/bin/bash
board=(" " " " " " " " " " " " " " " " " ")

base_board() {
    echo "Hi, welcome to tictactoe game. Player makes moves by choosing one of nine available fields shown below"
    echo
    echo "1 | 2 | 3"
    echo "---------"
    echo "4 | 5 | 6"
    echo "---------"
    echo "7 | 8 | 9"
    echo
}

player_mv() {
    local move
    while true; do
        read -p "Choose field (1-9) or type 's' to save the game: " move
        if [[ $move == "s" ]]; then
            save_game
            echo "Game has been saved!"
            continue 
        elif [[ $move =~ ^[1-9]$ ]] && [[ ${board[move-1]} == " " ]]; then
            board[move-1]=$1
            break
        else
            echo "Illegal move. Try again."
        fi
    done
}


display_board() {
    echo
    echo " ${board[0]} | ${board[1]} | ${board[2]}"
    echo "-----------"
    echo " ${board[3]} | ${board[4]} | ${board[5]}"
    echo "-----------"
    echo " ${board[6]} | ${board[7]} | ${board[8]}"
    echo
}

iswin() {
    local symbol=$1
    local winners=("0 1 2" "3 4 5" "6 7 8" "0 3 6" "1 4 7" "2 5 8" "0 4 8" "2 4 6")
    for line in "${winners[@]}"; do
        local a b c
        read -r a b c <<< "$line"
        if [[ ${board[a]} == "$symbol" && ${board[b]} == "$symbol" && ${board[c]} == "$symbol" ]]; then
            return 0
        fi
    done
    return 1
}

isdraw() {
    for cell in "${board[@]}"; do
        if [[ $cell == " " ]]; then
            return 1
        fi
    done
    return 0
}

enemy_mv() {
    local move
    while true; do
        move=$((RANDOM % 9))
        if [[ ${board[move]} == " " ]]; then
            board[move]="O"
            break
        fi
    done
}

save_game() {
    echo "$(IFS=,; echo "${board[*]}")" > tictactoe_save.txt
    echo "$player" >> tictactoe_save.txt
}



load_game() {
    if [[ -f tictactoe_save.txt ]]; then
        IFS=',' read -r -a board < <(head -n 1 tictactoe_save.txt)
        player=$(tail -n 1 tictactoe_save.txt)
        echo "Game loaded! Now moves: $player."
    else
        echo "Brak zapisanej gry."
    fi
}



game_pvp() {
    while true; do
        display_board
        echo "Player's turn $player."

        player_mv "$player"

        if iswin "$player"; then
            display_board
            echo "$player won!"
            break
        fi

        if isdraw; then
            display_board
            echo "Tie!"
            break
        fi

        player=$([[ $player == "x" ]] && echo "O" || echo "x")
    done
}



game_pvc() {
    local player="x"
    while true; do
        display_board
        if [[ $player == "x" ]]; then
            player_mv "$player"
        else
            enemy_mv
        fi

        if iswin "$player"; then
            display_board
            echo "$player wins!"
            break
        fi

        if isdraw; then
            display_board
            echo "Tie!"
            break
        fi

        player=$([[ $player == "x" ]] && echo "O" || echo "x")
    done
}

while true; do
    echo "1. New game (PvP)"
    echo "2. New game (PvE)"
    echo "3. Load"
    echo "4. Quit"
    read -p "Choose an option: " choice
    case $choice in
        1) board=(" " " " " " " " " " " " " " " " " "); player="x"; base_board; game_pvp ;;
        2) board=(" " " " " " " " " " " " " " " " " "); player="x"; base_board; game_pvc ;;
        3) load_game; game_pvp ;;
        4) echo "Thanks for playing"; break ;;
        *) echo "Illegal choice, try again." ;;
    esac
done

