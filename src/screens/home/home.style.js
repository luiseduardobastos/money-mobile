import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  logo: {
    width: 100,
    height: 30,
  },
  dashboard: {
    width: "100%",
    backgroundColor: COLORS.blue,
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dashboardValor: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
  },
  dashboardText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
  },
  dashboardImg: {
    width: 35,
    height: 60,
  },
  despesasTitulo: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.dark_gray,
    marginTop: 15,
    fontWeight: "bold",
  },
  btnAddImage: {
    width: 50,
    height: 50,
  },
  btnAdd: {
    position: "absolute",
    bottom: 12,
  },
};
