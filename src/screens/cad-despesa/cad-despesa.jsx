import {useEffect, useState} from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import {styles} from "./cad-despesa.style.js";
import icons from "../../constants/icons.js";
import {Picker} from '@react-native-picker/picker';
import api from "../../services/api.js";

const CadDespesa = (props) => {

    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");

    const handleSalvar = async () => {
        try {
            if (props.route.params.id > 0) {
                await api.put("/despesas/" + props.route.params.id, {
                    descricao: descricao,
                    categoria: categoria,
                    valor: valor
                })
            } else {
                await api.post("/despesas", {
                    descricao: descricao,
                    categoria: categoria,
                    valor: valor
                })
            }
    
            props.navigation.navigate("home");
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao salvar dados");
        }
    }

    const handleExcluir = async () => {
        try {
            await api.delete("/despesas/" + props.route.params.id);
            props.navigation.navigate("home");
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao excluir dados");
        }
    }

    const DadosDespesa = async (id) => {
        try {
            // Buscar dados na API
            const response = await api.get("/despesas/" + id);
            setDescricao(response.data.descricao);
            setCategoria(response.data.categoria);
            setValor(response.data.valor);

        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao buscar dados da despesa");
        }
    };

    useEffect(() => {
        // Tratar o texto do header
        props.navigation.setOptions({
            title: props.route.params.id > 0 ? "Editar Despesa" : "Nova Despesa"
        });

        // Buscar dados da despesa na API
        if (props.route.params.id > 0) {
            DadosDespesa(props.route.params.id);
        }
    }, []);

    return <View style={styles.container}>
        
        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Valor</Text>
            <TextInput placeholder="0,00" style={styles.inputValor} 
                       defaultValue={valor.toString()} 
                       keyboardType="decimal-pad"
                       onChangeText={(texto) => setValor(texto)} />
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput placeholder="Ex: Aluguel" 
                       style={styles.inputText} 
                       defaultValue={descricao}
                       onChangeText={(texto) => setDescricao(texto)} />
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={categoria} 
                        onValueChange={(itemValue, itemIndex) => {
                            setCategoria(itemValue);
                        }}>
                    <Picker.Item label="Carro" value="Carro" />
                    <Picker.Item label="Casa" value="Casa" />
                    <Picker.Item label="Lazer" value="Lazer" />
                    <Picker.Item label="Mercado" value="Mercado" itemStyle={{padding: 0}} />
                    <Picker.Item label="Educação" value="Educação" />
                    <Picker.Item label="Viagem" value="Viagem" />
                </Picker>
            </View>
        </View>

        <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.containerDelete}>
            <TouchableOpacity onPress={handleExcluir}>
                <Image source={icons.remove} style={styles.btnDelete} />
            </TouchableOpacity>
        </View>

    </View>
}

export default CadDespesa;