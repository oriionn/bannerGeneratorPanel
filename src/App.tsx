import React, {useState} from 'react';
import {
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview, Image, Input,
  Label,
  makeStyles,
  shorthands, useId
} from "@fluentui/react-components";
import { CopyFilled, CopyAddFilled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    width: "720px",
    maxWidth: "100%",
    marginTop: "10px"
  },
  field: {
    ...shorthands.margin("auto"),
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
    marginTop: "10px"
  }
});

export const App: React.FunctionComponent = () => {
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState("https://banapi.oriondev.fr");

  const nameId = useId("name");
  const descriptionId = useId("description")
  const styles = useStyles();

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader
          header={
            <Body1>
              Prévisualisation - {project === "" ? "Aucun nom" : project}
            </Body1>
          }

          description={
            <Caption1>{description === "" ? "Aucune description" : description}</Caption1>
          }
        />

        <CardPreview>
          <img src={previewUrl} alt={project + " - " + description} />
        </CardPreview>

        <CardFooter>
          <Button icon={<CopyFilled />} onClick={(e) => {
            navigator.clipboard.writeText(previewUrl).then(() => {
              alert("Lien copié !");
            })
          }}>Copier le lien</Button>
          <Button icon={<CopyAddFilled />} onClick={(e) => {
            navigator.clipboard.writeText(`![Project Banner](${previewUrl})`).then(() => {
              alert("Lien copié !");
            })
          }}>Copier le lien pour un README</Button>
        </CardFooter>
      </Card>

      <div className={styles.field}>
        <Label htmlFor={nameId}>
          Nom du projet
        </Label>
        <Input id={nameId} onChange={(e) => {
          setProject(e.target.value);
          setPreviewUrl(`https://banapi.oriondev.fr/?name=${encodeURIComponent(e.target.value)}&description=${encodeURIComponent(description)}`);
        }} />
      </div>

      <div className={styles.field}>
        <Label htmlFor={descriptionId}>
          Description du projet
        </Label>
        <Input id={descriptionId} onChange={(e) => {
          setDescription(e.target.value);
          setPreviewUrl(`https://banapi.oriondev.fr/?name=${encodeURIComponent(project)}&description=${encodeURIComponent(e.target.value)}`);
        }} />
      </div>
    </div>
  );
};
