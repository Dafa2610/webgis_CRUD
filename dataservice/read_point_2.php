<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$geojson = array(
	 'type'      => 'FeatureCollection',
	 'features'  => array()
);
try {
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbcon->prepare("SELECT p.gid, p.notes, p.ST_AsGeoJSON(geom, 4326, 1) AS p.geojson, c.category FROM data_point p JOIN data_categories c ON c.id = p.id_category");
	$stmt = $dbcon->prepare("SELECT gid, notes, ST_AsGeoJSON(geom, 4326, 1) AS geojson FROM data_point");
	if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
			unset($properties['geojson']);
			unset($properties['geom']);
			
			$feature = array(
				'type' => 'Feature',
				'id' => $id_count,
				'properties' => $properties,
				'geometry' => json_decode($rowset['geojson'], true)
			);
			array_push($geojson['features'], $feature);
			$id_count++;
			break;

		}
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	} else {
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	}
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode($geojson, JSON_NUMERIC_CHECK);
	$dbcon = null;
	exit;
}