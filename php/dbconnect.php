<?php
class DB {

  private static $con;

  public static function getCon(){

    if(!self::$con) {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "games";

    self::$con = new mysqli($servername, $username, $password, $dbname);
  }
  return self::$con;
  }
}
?>
