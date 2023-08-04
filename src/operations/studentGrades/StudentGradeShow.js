import React, { useState, useEffect } from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet, Font, BlobProvider } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const StudentGradeShow = () => {
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    const pdfUrl = 'http://sites.univ-lyon2.fr/lettres/zdoc-varia/AideMemoireWeb.pdf';
    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Réponse réseau non valide');
        }
        return response.blob(); // Fetch PDF content as Blob
      })
      .then((blob) => {
        // Convert the Blob to base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result;
          setPdfContent(base64data);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du PDF : ', error);
      });
  }, []);

  // Register font (you can use other fonts as well)
  Font.register({
    family: 'Roboto',
    src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf',
  });

  return (
    <div>
      <h1>Affichage du PDF à partir d'une URL sécurisée</h1>
      {pdfContent ? (
        <BlobProvider document={<Document />} data={pdfContent}>
          {({ blob }) => (
            <PDFViewer>
              <BlobProvider instance={blob}>
                {({ url }) => (
                  <Document>
                    <Page size="A4" style={styles.page}>
                      <View style={styles.section}>
                        <Text>Contenu du PDF à partir du lien :</Text>
                      </View>
                      <View style={styles.section}>
                        <Text>{url}</Text>
                      </View>
                    </Page>
                  </Document>
                )}
              </BlobProvider>
            </PDFViewer>
          )}
        </BlobProvider>
      ) : (
        <p>Chargement du PDF...</p>
      )}
    </div>
  );
};
