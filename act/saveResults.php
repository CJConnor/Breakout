<?php

    $name  = $_POST['name'];
    $score = $_POST['score'];

    $json = json_decode(file_get_contents('../_assets/json/leaderboard.json'));

    $json->leaderboard[] = ['name' => $name, 'score' => $score, 'date', date('Y-m-d')];

    $json = json_encode($json);

    file_put_contents('../_assets/json/leaderboard.json', $json);

    echo 'success';

?>