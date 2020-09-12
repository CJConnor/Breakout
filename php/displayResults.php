<?php
    
    include_once "dbconnect.php";

    $sql = "SELECT * FROM leaderboard ORDER BY score DESC";
    $result = DB::getCon()->query($sql);
    $count = $result->num_rows;
    $html = "";

    if($count > 0) {

        while($row = $result->fetch_assoc()) {

            $name = $row['name'];
            $score = $row['score'];

            $html .= "<tr><td>" . $name . "</td><td>" . $score . "</td></tr>";

        }

        echo $html;

    } else {

        $html .= "Get Playing!";

    }

?>