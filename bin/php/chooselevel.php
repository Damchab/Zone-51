<?php
error_reporting ( E_ALL );
include ("config.php");

try
{
	$levels = array ();
	$connexion = new PDO ( $source, $user, $motDePasse );
	$requete = "SELECT * FROM Levels";
	$resultat = $connexion->query ( $requete );
	
	if ($resultat->rowCount () != 0)
	{
		foreach ( $resultat as $ligne )
		{
			$level = array (
					$ligne ['NumeroLevel'],
					$ligne ['NomLevel'] 
			);
			array_push ( $levels, $level );
		}
	}
	
	echo json_encode ( $levels );
} catch ( PDOException $e )
{
	print 'Erreur de connection PDO : ' . $e->getMessage () . '<br />';
	die ();
}

?>
