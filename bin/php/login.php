<?php
error_reporting ( E_ALL );
include ("config.php");

try
{
	$login = array ();
	if (isset ( $_POST ['login'] ) && ($_POST ['login'] !== '' || $_POST ['login'] == 'invite'))
	{
		
		$connexion = new PDO ( $source, $user, $motDePasse );
		$requete = "SELECT * FROM Users WHERE Login = '" . $_POST ['login'] . "'";
		$resultat = $connexion->query ( $requete );
		
		if (!($resultat->rowCount() > 0))
		{
			$requete = "INSERT INTO Users(ID, Login) VALUES ('','" . $_POST ['login'] . "')";
			$connexion->query ( $requete );
			$login ['id'] = $connexion->lastInsertId ( 'ID' );
			$login ['login'] = $_POST ['login'];
		} else
		{
			foreach ( $resultat as $ligne )
			{
				$login ['id'] = $ligne ['ID'];
				$login ['login'] = $ligne ['Login'];
			}
		}
	} else
	{
		$login ['id'] = '-1';
		$login ['login'] = $_POST ['login'];
	}
	echo json_encode ( $login );
} catch ( PDOException $e )
{
	print 'Erreur de connection PDO : ' . $e->getMessage () . '<br />';
	die ();
}

?>
