import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const AuthorBookFormModal = ({ visible, onClose, onSubmit }) => {
  // Form state fields
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [isbn, setIsbn] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [ebookFile, setEbookFile] = useState(null);
  const [sampleEbookFile, setSampleEbookFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [published, setPublished] = useState('');
  // Object to hold errors for each field
  const [errors, setErrors] = useState({});

  // Validate that all required fields are filled
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!title.trim()) {
      valid = false;
      newErrors.title = 'Title is required.';
    }
    if (!publisher.trim()) {
      valid = false;
      newErrors.publisher = 'Publisher is required.';
    }
    if (!price.trim()) {
      valid = false;
      newErrors.price = 'Price is required.';
    }
    if (!isbn.trim()) {
      valid = false;
      newErrors.isbn = 'ISBN is required.';
    }
    if (!coverImage) {
      valid = false;
      newErrors.coverImage = 'Cover image is required.';
    }
    if (!ebookFile) {
      valid = false;
      newErrors.ebookFile = 'eBook file is required.';
    }
    if (!sampleEbookFile) {
      valid = false;
      newErrors.sampleEbookFile = 'Sample eBook file is required.';
    }
    if (!summary.trim()) {
      valid = false;
      newErrors.summary = 'Summary is required.';
    }
    if (!published.trim()) {
      valid = false;
      newErrors.published = 'Published date is required.';
    }
    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const bookData = {
        title,
        publisher,
        price,
        isbn,
        coverImage,
        ebookFile,
        sampleEbookFile,
        summary,
        published,
      };
      onSubmit(bookData);
      handleClean();
    }
  };

  // Reset/clean form fields
  const handleClean = () => {
    setTitle('');
    setPublisher('');
    setPrice('');
    setIsbn('');
    setCoverImage(null);
    setEbookFile(null);
    setSampleEbookFile(null);
    setSummary('');
    setPublished('');
    setErrors({});
  };

  // Dummy functions to simulate file/image selection
  const pickCoverImage = () => {
    // Replace this with your image picker logic
    setCoverImage({ uri: 'https://via.placeholder.com/150' });
  };

  const pickEbookFile = () => {
    // Replace with file picker logic
    setEbookFile({ name: 'ebook.pdf' });
  };

  const pickSampleEbookFile = () => {
    // Replace with file picker logic
    setSampleEbookFile({ name: 'sample_ebook.pdf' });
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add New Book</Text>

        {/* Title Field */}
        <View style={styles.formGroup}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter book title"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Publisher Field */}
        <View style={styles.formGroup}>
          <Text>Publisher</Text>
          <TextInput
            style={styles.input}
            value={publisher}
            onChangeText={setPublisher}
            placeholder="Enter publisher"
          />
          {errors.publisher && (
            <Text style={styles.errorText}>{errors.publisher}</Text>
          )}
        </View>

        {/* Price Field */}
        <View style={styles.formGroup}>
          <Text>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
          {errors.price && (
            <Text style={styles.errorText}>{errors.price}</Text>
          )}
        </View>

        {/* ISBN Field */}
        <View style={styles.formGroup}>
          <Text>ISBN</Text>
          <TextInput
            style={styles.input}
            value={isbn}
            onChangeText={setIsbn}
            placeholder="Enter ISBN"
          />
          {errors.isbn && <Text style={styles.errorText}>{errors.isbn}</Text>}
        </View>

        {/* Cover Image Field */}
        <View style={styles.formGroup}>
          <Text>Cover Image</Text>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={pickCoverImage}
          >
            {coverImage ? (
              <Image
                source={{ uri: coverImage.uri }}
                style={styles.imagePreview}
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <FontAwesomeIcon icon={faUpload} size={24} />
                <Text>Upload Cover</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.coverImage && (
            <Text style={styles.errorText}>{errors.coverImage}</Text>
          )}
        </View>

        {/* eBook File Field */}
        <View style={styles.formGroup}>
          <Text>eBook File</Text>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={pickEbookFile}
          >
            {ebookFile ? (
              <Text style={styles.fileText}>{ebookFile.name}</Text>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <FontAwesomeIcon icon={faUpload} size={24} />
                <Text>Upload eBook</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.ebookFile && (
            <Text style={styles.errorText}>{errors.ebookFile}</Text>
          )}
        </View>

        {/* Sample eBook File Field */}
        <View style={styles.formGroup}>
          <Text>Sample eBook File</Text>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={pickSampleEbookFile}
          >
            {sampleEbookFile ? (
              <Text style={styles.fileText}>{sampleEbookFile.name}</Text>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <FontAwesomeIcon icon={faUpload} size={24} />
                <Text>Upload Sample eBook</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.sampleEbookFile && (
            <Text style={styles.errorText}>{errors.sampleEbookFile}</Text>
          )}
        </View>

        {/* Summary Field */}
        <View style={styles.formGroup}>
          <Text>Summary</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={summary}
            onChangeText={setSummary}
            placeholder="Enter summary"
            multiline
          />
          {errors.summary && (
            <Text style={styles.errorText}>{errors.summary}</Text>
          )}
        </View>

        {/* Published Date Field */}
        <View style={styles.formGroup}>
          <Text>Published Date</Text>
          <TextInput
            style={styles.input}
            value={published}
            onChangeText={setPublished}
            placeholder="YYYY-MM-DD"
          />
          {errors.published && (
            <Text style={styles.errorText}>{errors.published}</Text>
          )}
        </View>

        {/* Button Group */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  fileText: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AuthorBookFormModal;
