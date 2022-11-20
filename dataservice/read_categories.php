<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$categories = array(
	 'categories'  => array()
);
try {
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbcon->prepare("SELECT id, category FROM data_categories");
	if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
				$feature = array(
						 'id' => $properties['id'],
						 'category' => $properties['category'],
				);
			array_push($categories['categories'], $feature);
			$id_count++;
		}
		header('Content-Type: application/json');
		echo json_encode($categories, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	} else {
		header('Content-Type: application/json');
		echo json_encode($categories, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	}
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode($categories, JSON_NUMERIC_CHECK);
	$dbcon = null;
	exit;
}
?>