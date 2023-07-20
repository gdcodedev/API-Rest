using System.ComponentModel;

namespace SistemaValide.Enums
{
    public enum StatusTarefa
    {
        [Description("A fazer")]
        Afazer = 1,
        [Description("Em andamento")]
        EmAndamento = 2,
        [Description("Concluído")]
        Concluido = 3
    }
}
