<?php
class DB {

  private static $con;

  public static function getCon(){

    if(!self::$con) {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "breakout";

    self::$con = new mysqli($servername, $username, $password, $dbname);
  }
  return self::$con;
  }
}
?>
