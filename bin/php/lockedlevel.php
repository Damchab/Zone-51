<?php
error_reporting ( E_ALL );
include ("config.php");

try
{
	$levels = array ();
	$connexion = new PDO ( $source, $user, $motDePasse );
	$requete = "SELECT IDLevel, HightScore FROM Scores WHERE IDUser = '" . $_POST ['idUser'] . "'";
	$resultat = $connexion->query ( $requete );
	
	if ($resultat->rowCount () !== 0)
	{
		foreach ( $resultat as $ligne )
		{
			$level = array (
					$ligne ['IDLevel'],
					$ligne ['HightScore'] 
			);
			array_push ( $levels, $level );
		}
	} else
	{
		array_push ( $levels, '' );
	}
	echo json_encode ( $levels );
} catch ( PDOException $e )
{
	print 'Erreur de connection PDO : ' . $e->getMessage () . '<br />';
	die ();
}

?>
