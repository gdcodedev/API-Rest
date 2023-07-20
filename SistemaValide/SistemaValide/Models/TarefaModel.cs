using SistemaValide.Enums;

namespace SistemaValide.Models
{
    public class TarefaModel
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Endereco { get; set; }
        public StatusTarefa Status { get; set; }

    }
}
