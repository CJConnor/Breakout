<?php

    include_once"dbconnect.php";

    $name = $_POST['name'];
    $score = $_POST['score'];

    $sql = "INSERT INTO breakout_leaderboard (name, score, timestamp) VALUES ('$name', '$score', NOW())";
    $result = DB::getCon()->query($sql);

    if(!empty($name) && !empty($score)) {

        echo"success";

    } else {

        echo"error";

    }

    

?>