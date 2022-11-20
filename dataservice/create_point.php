<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
if (isset($_GET['command'])) {
	if ($_GET['command']=="POINT") {
		$notes = $_GET['notes'];
		$geometry = $_GET['geometry'];
		$category_id = $_GET['category'];
		try {
			$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $dbcon->prepare("INSERT INTO data_point(notes, geom, id_category) VALUES(UPPER(:notes), ST_GeomFromText(:geometry, 4326), :category_id)");
			$stmt->bindValue(":notes", $notes, PDO::PARAM_STR);
			$stmt->bindValue(":geometry", $geometry, PDO::PARAM_STR);
			$stmt->bindValue(":category_id", $category_id, PDO::PARAM_STR);
			if($stmt->execute()){
				$response = array("response"=>"200","message"=>"created");
				header('Content-Type: application/json');
				echo json_encode($response);
				$dbcon = null;
				exit;
			} else {
				$response = array("response"=>"500","message"=>$e->getMessage());
				header('Content-Type: application/json');
				echo json_encode($response);
				$dbcon = null;
				exit;
			}
		} catch (PDOException $e) {
			$response = array("response"=>"500","message"=>$e->getMessage());
			header('Content-Type: application/json');
			echo json_encode($response);
			$dbcon = null;
			exit;
		}
	} else {
		$response = array("response"=>"404","message"=>"Command is not properly set.");
		header('Content-Type: application/json');
		echo json_encode($response);
		$dbcon = null;
		exit;
	}
} else {
	$response = array("response"=>"404","message"=>"Command is not properly set.");
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>